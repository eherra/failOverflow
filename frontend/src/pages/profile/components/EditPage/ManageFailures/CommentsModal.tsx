import { useState, useContext, useEffect } from 'react';
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
import UserCommentsColumn from '../../../../common/Comments/UserCommentsColumn';
import { IFailure, IListComment } from '../../../../../types';
import { useNotificationContext } from '../../../../../context/NotificationContext';

interface ICommentsModal {
  allowComments?: boolean;
  failureId?: string;
  setCommentsModalShow(boolean: any): void;
  setFailures(failures: Array<IFailure>): void;
}

const CommentsModal = ({
  allowComments,
  failureId,
  setCommentsModalShow,
  setFailures,
}: ICommentsModal) => {
  const screenSize = useContext(ResponsiveContext);
  const { handleError } = useNotificationContext();
  const allowCommentsText = allowComments ? 'Yes' : 'No';
  const [commentsAllowedLabel, setCommentsAllowedLabel] = useState<string>(allowCommentsText);
  const [currComments, setCurrComments] = useState<Array<IListComment>>([]);
  const [isCommentsFetchError, setIsCommentsFetchError] = useState<boolean>(false);

  useEffect(() => {
    fetchCommentsData();
  }, []);

  const fetchCommentsData = async () => {
    try {
      const { commentsData } = await failureService.getFailureComments(failureId || '');
      setCurrComments(commentsData || []);
    } catch (err) {
      setIsCommentsFetchError(true);
    }
  };

  const toggleCommentAllowed = async (toggleValue: boolean) => {
    try {
      await failureService.toggleCommentAllowed(failureId || '', !toggleValue);
      setCommentsAllowedLabel((prevValue) => (prevValue === 'Yes' ? 'No' : 'Yes'));

      /* @ts-expect-error gives error */
      setFailures((prevFailures: Array<Failure>) => {
        const newState = prevFailures.map((mFailure: IFailure) => {
          if (mFailure._id === failureId) {
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
      modal={true}
      style={{ overflow: 'auto' }}>
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
          {isCommentsFetchError ? (
            <p>Could not fetch comments data.</p>
          ) : (
            <UserCommentsColumn comments={currComments} />
          )}
          <NameValuePair name='Allow commenting?'>
            <CheckBox
              name='comments'
              label={commentsAllowedLabel}
              checked={isCommentsChecked}
              toggle
              onClick={() => toggleCommentAllowed(isCommentsChecked)}
            />
          </NameValuePair>
        </NameValueList>
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
      </Box>
    </Layer>
  );
};

export default CommentsModal;
