import { useState, SyntheticEvent, useEffect } from 'react';
import { Box, NameValueList, Tab, Form, FormField, TextArea, Button, Text, Spinner } from 'grommet';
import failureService from '../../../../../../api/failures';
import { Login, ChatOption, Chat } from 'grommet-icons';
import { useUserContext } from '../../../../../../context/UserContext';
import UserCommentsColumn from './UserCommentsColumn';
import { useNotificationContext } from '../../../../../../context/NotificationContext';
import { WavyLink } from 'react-wavy-transitions';
import LabelWithInfoTip from '../../../../../common/LabelWithInfoTip';

interface ICommentTab {
  failureId: string;
  allowComments: boolean;
}

interface IComment {
  comment: string;
  createdAt: string;
  _id: string;
}

const CommentTab = ({ failureId, allowComments }: ICommentTab) => {
  const { user } = useUserContext();
  const { createNotification } = useNotificationContext();

  const [commentInput, setCommentInput] = useState<string>('');
  const [isSendingComment, setIsSendingComment] = useState<boolean>(false);
  const [currComments, setCurrComments] = useState<Array<IComment>>([]);
  const [isCommentsFetchError, setIsCommentsFetchError] = useState<boolean>(false);

  useEffect(() => {
    fetchCommentsData();
  }, []);

  const fetchCommentsData = async () => {
    try {
      const { commentsData } = await failureService.getFailureComments(failureId);
      setCurrComments(commentsData[0].comments);
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
        commentorId: user?.id || '',
        failureId: failureId,
      });
      setCurrComments((prevComments) => [...prevComments, createdComment]);
      setCommentInput('');
      setIsSendingComment(false);
      createNotification({
        message: 'Comment added succesfully!',
        isError: false,
        icon: <ChatOption color='#96ab9c' />,
      });
    } catch (e) {
      console.log(e);
      setIsSendingComment(false);
      setCommentInput('');
      createNotification({ message: 'Something went wrong! Try again later.', isError: true });
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
                      placeholder='e.g. did you find it helpful?'
                      id='textArea'
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
            <p>Something went wrong. Try again later</p>
          ) : (
            <UserCommentsColumn comments={currComments} />
          )}
        </NameValueList>
      </Box>
    </Tab>
  );
};

export default CommentTab;
