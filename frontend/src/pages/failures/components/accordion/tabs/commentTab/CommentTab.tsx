import { useState, SyntheticEvent, useEffect } from 'react';
import { Box, NameValueList, Tab, Form, FormField, TextArea, Button, Text, Spinner } from 'grommet';
import failureService from '../../../../../../api/failures';
import { Login, ChatOption, Chat } from 'grommet-icons';
import { useUserContext } from '../../../../../../context/UserContext';
import UserCommentsColumn from '../../../../../common/Truncates/comments/UserCommentsColumn';
import { useNotificationContext } from '../../../../../../context/NotificationContext';
import { WavyLink } from 'react-wavy-transitions';
import LabelWithInfoTip from '../../../../../common/LabelWithInfoTip';
import { IListComment } from '../../../../../../types';

interface ICommentTab {
  failureId: string;
  allowComments: boolean;
}

const CommentTab = ({ failureId, allowComments }: ICommentTab) => {
  const { user } = useUserContext();
  const { createNotification, handleError } = useNotificationContext();

  const [commentInput, setCommentInput] = useState<string>('');
  const [isSendingComment, setIsSendingComment] = useState<boolean>(false);
  const [currComments, setCurrComments] = useState<Array<IListComment>>([]);
  const [isCommentsFetchError, setIsCommentsFetchError] = useState<boolean>(false);

  useEffect(() => {
    fetchCommentsData();
  }, []);

  const fetchCommentsData = async () => {
    try {
      const { commentsData } = await failureService.getFailureComments(failureId);
      setCurrComments(commentsData || []);
    } catch (err) {
      setIsCommentsFetchError(true);
    }
  };

  const handleCommentSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      setIsSendingComment(true);
      const { createdComment } = await failureService.addCommentToFailure({
        comment: commentInput,
        failureId: failureId,
      });
      createdComment.username = user?.username;
      createdComment.avatarUrl = user?.avatarUrl;

      setCurrComments((prevComments) => [createdComment, ...prevComments]);
      setCommentInput('');
      setIsSendingComment(false);
      createNotification({
        message: 'Comment added succesfully!',
        isError: false,
        icon: <ChatOption color='#96ab9c' />,
      });
    } catch (err) {
      handleError(err);
      setIsSendingComment(false);
      setCommentInput('');
    }
  };

  return (
    <Tab title='Comments' icon={<Chat />}>
      <Box gap='large' margin='large'>
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout='grid'
          valueProps={{ width: 'medium' }}
          justifyContent='center'>
          {!user ? (
            <Box align='start' pad={{ top: 'small', bottom: 'small' }} gap='small'>
              <Text weight='bold' size='medium'>
                Sign in to leave a comment
              </Text>
              <WavyLink to='/login' color='#A7BEAE' duration='1000' direction='down'>
                <Button icon={<Login />} primary hoverIndicator label='Sign in here' />
              </WavyLink>
            </Box>
          ) : (
            <>
              {allowComments ? (
                <Form onSubmit={handleCommentSubmit}>
                  <FormField label='Leave a comment' htmlFor='textArea'>
                    <TextArea
                      required
                      placeholder='e.g. did you find it helpful?'
                      id='textArea'
                      maxLength={300}
                      value={commentInput}
                      onChange={(event) => setCommentInput(event.target.value)}
                    />
                  </FormField>
                  <Box direction='row' gap='medium'>
                    <Button
                      icon={isSendingComment ? <Spinner /> : undefined}
                      label={isSendingComment ? 'Sending' : 'Send'}
                      primary
                      type='submit'
                    />
                  </Box>
                </Form>
              ) : (
                <Box direction='row' pad={{ top: 'small', bottom: 'small' }} gap='small'>
                  <LabelWithInfoTip
                    text='Commenting not allowed.'
                    tipContent='User has denied commenting for the failure.'
                    alignTipContent={{ align: { bottom: 'top' } }}
                  />
                </Box>
              )}
            </>
          )}

          {isCommentsFetchError ? (
            <p>Something went wrong. Try again later.</p>
          ) : (
            <UserCommentsColumn comments={currComments} />
          )}
        </NameValueList>
      </Box>
    </Tab>
  );
};

export default CommentTab;
