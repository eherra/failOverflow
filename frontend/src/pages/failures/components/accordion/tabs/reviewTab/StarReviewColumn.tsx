import { Box, Tab, NameValuePair, Button, NameValueList, Text, Spinner } from 'grommet';
import { Link } from 'react-router-dom';
import StarRatingForm from './StarRatingForm';
import { Login } from 'grommet-icons';
import { useUserContext } from '../../../../../../context/UserContext';

interface IStarReviewColumn {
  failureId: string;
  reviewAverage: number;
  userReview: number;
}

const StarReviewColumn = ({ failureId, reviewAverage, userReview }: IStarReviewColumn) => {
  const { user } = useUserContext();
  return (
    <>
      <Box direction='column' gap='medium'>
        <NameValuePair key='stars' name='Stars received'>
          {reviewAverage ? reviewAverage : 'No reviews yet'}
        </NameValuePair>
        {user ? (
          <StarRatingForm failureId={failureId} userReview={userReview} />
        ) : (
          <Box pad={{ top: 'small', bottom: 'small' }} gap='small'>
            <Text weight='bold' size='medium'>
              Sign in to leave a review/vote
            </Text>
            <Link to='/login'>
              <Button icon={<Login />} primary hoverIndicator label='Sign in here' />
            </Link>
          </Box>
        )}
      </Box>
    </>
  );
};

export default StarReviewColumn;
