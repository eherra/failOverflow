import { Avatar, Box, Text } from 'grommet';
import { createTimePassedInfo } from '../../../utils/TimeUtils';
import { AWS_URL } from '../../../utils/config';
import TruncateText from '../TruncateText';

interface ICommentRow {
  comment: string;
  username: string;
  createdAt: string;
  avatarUrl: string;
}

const CommentRow = ({ comment, username, createdAt, avatarUrl }: ICommentRow) => {
  return (
    <>
      <Box direction='row' gap='small'>
        <Avatar src={avatarUrl ? `${AWS_URL}/${avatarUrl}` : '/defaultAvatar.jpeg'} size='medium' />
        <p>{username}</p>
        <p
          style={{ opacity: '0.8', marginLeft: 'auto', fontSize: '17px' }}>{`${createTimePassedInfo(
          createdAt || '',
        )} ago`}</p>
      </Box>

      <Text style={{ fontStyle: 'italic' }} size='medium' margin='xsmall'>
        <TruncateText text={comment} />
      </Text>
    </>
  );
};

export default CommentRow;
