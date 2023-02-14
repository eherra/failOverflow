import { useState, SyntheticEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, NameValueList, Tab, Form, FormField, TextArea, Button, Text, Spinner } from 'grommet';
import failureService from '../../../../../../api/failures';
import { Login, Coffee } from 'grommet-icons';
import { useUserContext } from '../../../../../../context/UserContext';
import UserCommentsColumn from './UserCommentsColumn';
import { useNotificationContext } from '../../../../../../context/NotificationContext';

interface ICommentTab {
  failureId: string;
}

interface IComment {
  comment: string;
  createdAt: string;
  _id: string;
}

const CommentTab = ({ failureId }: ICommentTab) => {
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
      const newComment = await failureService.addCommentToFailure({
        comment: commentInput,
        commentorId: user?.id || '',
        failureId: failureId,
      });
      setCurrComments((prevComments) => [...prevComments, newComment.comment]);
      setCommentInput('');
      setIsSendingComment(false);
      createNotification({
        message: 'Comment added succesfully!',
        isError: false,
        icon: <Coffee />,
      });
    } catch (e) {
      console.log(e);
      setIsSendingComment(false);
      setCommentInput('');
      createNotification({ message: 'Something went wrong! Try again later.', isError: true });
    }
  };

  return (
    <Tab title='Comments'>
      <Box gap='large' margin='large'>
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout='grid'
          valueProps={{ width: 'medium' }}
          justifyContent='center'>
          {user ? (
            <Form onSubmit={handleCommentSubmit}>
              <FormField label='Leave a comment' htmlFor='text-area-example'>
                <TextArea
                  placeholder='e.g. did you find it helpful?'
                  id='text-area-example'
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
            <Box pad={{ top: 'small', bottom: 'small' }} gap='small'>
              <Text weight='bold' size='medium'>
                Sign in to leave a comment
              </Text>
              <Link to='/login'>
                <Button icon={<Login />} primary hoverIndicator label='Sign in here' />
              </Link>
            </Box>
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
