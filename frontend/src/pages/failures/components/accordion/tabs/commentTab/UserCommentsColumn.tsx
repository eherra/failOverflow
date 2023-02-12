import { useState } from 'react';
import { NameValuePair } from 'grommet';
import ShowMoreCommentsButton from '../../../../../common/ShowMoreCommentsButton';

interface IComment {
  comment: string;
  createdAt: string;
  _id: string;
}

interface IUserComments {
  comments?: Array<IComment>;
}

const UserCommentsColumn = ({ comments }: IUserComments) => {
  const [showAllComments, setShowAllComments] = useState<boolean>(false);

  return (
    <NameValuePair name="User's comments">
      <>
        {comments?.length ? (
          <>
            <ul style={{ listStyleType: 'circle' }}>
              {comments
                .slice(0, showAllComments || comments.length < 3 ? comments.length : 3)
                .map((comment) => (
                  <li key={comment.createdAt}>{comment.comment}</li>
                ))}
            </ul>
            {comments.length > 3 && (
              <ShowMoreCommentsButton showAll={showAllComments} setShowAll={setShowAllComments} />
            )}
          </>
        ) : (
          <p>No comments to show</p>
        )}
      </>
    </NameValuePair>
  );
};

export default UserCommentsColumn;
