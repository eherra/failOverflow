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
import { IComment } from '../../../../../types';

interface ICommentsModal {
  comments?: Array<IComment>;
  failureId?: string;
  setCommentsModalShow(boolean: any): void;
  allowComments?: boolean;
}

const CommentsModal = ({
  setCommentsModalShow,
  comments,
  failureId,
  allowComments,
}: ICommentsModal) => {
  const screenSize = useContext(ResponsiveContext);
  const allowCommentsText = allowComments ? 'Yes' : 'No';
  const [commentsAllowedLabel, setCommentsAllowedLabel] = useState<string>(allowCommentsText);

  const toggleCommentAllowed = async (toggleValue: boolean) => {
    try {
      await failureService.toggleCommentAllowed(failureId || '', !toggleValue);
      setCommentsAllowedLabel((prevValue) => (prevValue === 'Yes' ? 'No' : 'Yes'));
    } catch (err) {
      console.log(err);
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
          <NameValuePair name="People's comments">
            <UserCommentsColumn comments={comments} />
          </NameValuePair>
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
