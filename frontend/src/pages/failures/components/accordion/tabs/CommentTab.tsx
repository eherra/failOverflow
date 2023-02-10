import { useState, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  NameValueList,
  NameValuePair,
  Tab,
  Form,
  FormField,
  TextArea,
  Button,
  Text,
  Spinner,
} from 'grommet';
import ShowMoreCommentsButton from '../../../../common/ShowMoreCommentsButton';
import failureService from '../../../../../api/failures';
import { Login } from 'grommet-icons';
import { useUserContext } from '../../../../../context/UserContext';

interface ICommentTab {
  failureId: string;
  comments: Array<string>;
}

const CommentTab = ({ failureId, comments }: ICommentTab) => {
  const { user } = useUserContext();
  const [commentInput, setCommentInput] = useState<string>('');
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const [isSendingComment, setIsSendingComment] = useState<boolean>(false);
  const [currComments, setCurrComments] = useState<Array<string>>(comments);

  const handleCommentSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      setIsSendingComment(true);
      const newComment = await failureService.addCommentToFailure({
        comment: commentInput,
        commentorId: user?.id || '',
        failureId: failureId,
      });
      setCurrComments([...currComments, newComment.comment.comment]);
      setCommentInput('');
      setIsSendingComment(false);
    } catch (e) {
      setIsSendingComment(false);
      console.log(e);
      setCommentInput('');
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

          <NameValuePair name="User's comments">
            <>
              <ul>
                {currComments
                  .slice(0, showAllComments || currComments.length < 3 ? currComments.length : 3)
                  .map((comment) => (
                    <li key={comment}>{comment}</li>
                  ))}
              </ul>
              {currComments.length >= 3 && (
                <ShowMoreCommentsButton showAll={showAllComments} setShowAll={setShowAllComments} />
              )}
            </>
          </NameValuePair>
        </NameValueList>
      </Box>
    </Tab>
  );
};

export default CommentTab;
