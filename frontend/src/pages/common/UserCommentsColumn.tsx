import { useState } from 'react';
import { NameValuePair, Avatar, Box, List, Text } from 'grommet';
import { IListComment } from '../../types';
import { createTimePassedInfo } from '../../utils/TimeUtils';
import ShowMoreCommentsButton from './ShowMoreCommentsButton';

interface IUserComments {
  comments?: Array<IListComment>;
}

const UserCommentsColumn = ({ comments }: IUserComments) => {
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  return (
    <NameValuePair name="User's comments">
      <>
        {comments?.length ? (
          <>
            <List
              data={comments.slice(0, showAllComments || comments.length < 2 ? comments.length : 2)}
              style={{ marginBottom: '1em' }}>
              {
                /* @ts-expect-error giving error */
                (comment: IListComment, index: number) => (
                  <Box key={index}>
                    <CommentRow
                      key={comment.createdAt}
                      comment={comment.comment}
                      username={comment.username}
                      createdAt={comment.createdAt}
                    />
                  </Box>
                )
              }
            </List>
            {comments.length > 2 && (
              <ShowMoreCommentsButton showAll={showAllComments} setShowAll={setShowAllComments} />
            )}
          </>
        ) : (
          <p>No comments to show.</p>
        )}
      </>
    </NameValuePair>
  );
};

interface ICommentRow {
  comment?: string;
  username?: string;
  createdAt?: string;
}

const CommentRow = ({ comment, username, createdAt }: ICommentRow) => {
  return (
    <>
      <Box direction='row' gap='small'>
        <Avatar src='/avatar.png' size='medium' />
        <p>{username}</p>
        <p
          style={{ opacity: '0.8', marginLeft: 'auto', fontSize: '17px' }}>{`${createTimePassedInfo(
          createdAt || '',
        )} ago`}</p>
      </Box>

      <Text style={{ fontStyle: 'italic' }} size='medium' margin='xsmall'>
        {comment}
      </Text>
    </>
  );
};

export default UserCommentsColumn;
