import { useState } from 'react';
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
} from 'grommet';
import ShowMoreCommentsButton from '../../../../common/ShowMoreCommentsButton';
import { Login } from 'grommet-icons';

interface ICommentTab {
  comments: Array<string>;
  isAuth: boolean;
}

const CommentTab = ({ comments, isAuth }: ICommentTab) => {
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [showAllComments, setShowAllComments] = useState<boolean>(false);

  return (
    <Tab title='Comments'>
      <Box gap='large' margin='large'>
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout='grid'
          valueProps={{ width: 'medium' }}
          justifyContent='center'>
          {isAuth ? (
            <Form>
              <FormField label='Leave a comment' htmlFor='text-area-example'>
                <TextArea
                  placeholder='e.g. did you find it helpful?'
                  id='text-area-example'
                  value={textAreaValue}
                  onChange={(event) => setTextAreaValue(event.target.value)}
                />
              </FormField>
              <Box direction='row' gap='medium'>
                <Button type='submit' color='#A7BEAE' primary label='Send' />
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

          <NameValuePair name="People's comments">
            <>
              <ul>
                {comments
                  .slice(0, showAllComments || comments.length < 3 ? comments.length : 3)
                  .map((comment) => (
                    <li key={comment}>{comment}</li>
                  ))}
              </ul>
              {comments.length >= 3 && (
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
