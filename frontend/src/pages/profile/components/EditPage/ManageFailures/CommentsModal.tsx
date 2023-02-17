import { useState, useContext } from 'react';
import {
  Box,
  Button,
  Heading,
  Layer,
  ResponsiveContext,
  NameValuePair,
  NameValueList,
  CheckBox,
} from 'grommet';
import { Chat } from 'grommet-icons';
import failureService from '../../../../../api/failures';
import UserCommentsColumn from '../../../../failures/components/accordion/tabs/commentTab/UserCommentsColumn';
import { Failure } from '../../../../../types';
import { useNotificationContext } from '../../../../../context/NotificationContext';

interface ICommentsModal {
  failure?: Failure;
  setCommentsModalShow(boolean: any): void;
  setFailures(failures: Array<Failure>): void;
}

const CommentsModal = ({ failure, setCommentsModalShow, setFailures }: ICommentsModal) => {
  const screenSize = useContext(ResponsiveContext);
  const { handleError } = useNotificationContext();
  const allowCommentsText = failure?.allowComments ? 'Yes' : 'No';
  const [commentsAllowedLabel, setCommentsAllowedLabel] = useState<string>(allowCommentsText);

  const toggleCommentAllowed = async (toggleValue: boolean) => {
    try {
      await failureService.toggleCommentAllowed(failure?._id || '', !toggleValue);
      setCommentsAllowedLabel((prevValue) => (prevValue === 'Yes' ? 'No' : 'Yes'));

      /* @ts-expect-error TODO check this */
      setFailures((prevFailures: Array<Failure>) => {
        const newState = prevFailures.map((mFailure: Failure) => {
          if (mFailure._id === failure?._id) {
            return { ...mFailure, allowComments: !mFailure.allowComments };
          }
          return mFailure;
        });
        return newState;
      });
    } catch (err) {
      handleError(err);
    }
  };

  const isCommentsChecked = commentsAllowedLabel === 'Yes';

  return (
    <Layer
      onClickOutside={() => setCommentsModalShow(false)}
      onEsc={() => setCommentsModalShow(false)}
      modal={false}>
      <Box pad='medium' direction='row' gap='medium'>
        <Box direction='row' align='start' gap='small'>
          <Chat />
          <Heading level={2} size='small' margin='none'>
            Failure comments
          </Heading>
        </Box>
      </Box>
      <Box gap='small' margin='small'>
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout='grid'
          valueProps={{ width: 'large' }}
          justifyContent='center'>
          <UserCommentsColumn comments={failure?.comments} />
          <NameValuePair name='Change commenting allowance'>
            <CheckBox
              name='comments'
              label={commentsAllowedLabel}
              checked={isCommentsChecked}
              toggle
              onClick={() => toggleCommentAllowed(isCommentsChecked)}
            />
          </NameValuePair>
        </NameValueList>
      </Box>
      <Box
        align={['xsmall', 'small'].includes(screenSize) ? undefined : 'end'}
        pad='small'
        gap='xsmall'>
        <Button
          label='Close details'
          onClick={() => {
            setCommentsModalShow(false);
          }}
        />
      </Box>
    </Layer>
  );
};

export default CommentsModal;
