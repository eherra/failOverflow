import { useState } from 'react';
import { NameValuePair, Box, List } from 'grommet';
import { IListComment } from '../../../types';
import CommentRow from './CommentRow';
import ShowMoreCommentsButton from './ShowMoreCommentsButton';

interface IUserComments {
  comments?: Array<IListComment>;
}

const UserCommentsColumn = ({ comments }: IUserComments) => {
  const [showAllComments, setShowAllComments] = useState<boolean>(false);
  const commentsWithTruncation = comments?.slice(0, showAllComments ? comments.length : 2);
  return (
    <NameValuePair name="User's comments">
      <>
        {comments?.length ? (
          <>
            <List data={commentsWithTruncation} style={{ marginBottom: '1em' }}>
              {
                /* @ts-expect-error giving error */
                (comment: IListComment, index: number) => (
                  <Box key={index}>
                    <CommentRow key={comment.createdAt} {...comment} />
                  </Box>
                )
              }
            </List>
            {comments.length > 2 && (
              <ShowMoreCommentsButton
                commentsAmount={comments.length}
                showAll={showAllComments}
                setShowAll={setShowAllComments}
              />
            )}
          </>
        ) : (
          <p>No comments to show.</p>
        )}
      </>
    </NameValuePair>
  );
};

export default UserCommentsColumn;
