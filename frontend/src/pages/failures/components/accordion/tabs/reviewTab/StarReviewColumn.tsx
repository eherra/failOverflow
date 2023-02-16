import { Box, NameValuePair, Button, Text } from 'grommet';
import StarRatingForm from './StarRatingForm';
import { Login } from 'grommet-icons';
import { useUserContext } from '../../../../../../context/UserContext';
import { WavyLink } from 'react-wavy-transitions';

interface IStarReviewColumn {
  failureId: string;
  reviewAverage: number;
  userReview: number;
  setStarsData: ({ starAverage, userReview }: { starAverage: number; userReview: number }) => void;
}

const StarReviewColumn = ({
  failureId,
  reviewAverage,
  userReview,
  setStarsData,
}: IStarReviewColumn) => {
  const { user } = useUserContext();
  return (
    <Box direction='column' gap='medium'>
      <NameValuePair key='stars' name='Stars average'>
        {reviewAverage ? reviewAverage : 'No reviews yet'}
      </NameValuePair>
      {user ? (
        <StarRatingForm failureId={failureId} userReview={userReview} setStarsData={setStarsData} />
      ) : (
        <Box align='start' pad={{ top: 'small', bottom: 'small' }} gap='small'>
          <Text weight='bold' size='medium'>
            Sign in to leave a review/vote
          </Text>
          <WavyLink to='/login' color='#A7BEAE' duration='1000' direction='down'>
            <Button icon={<Login />} primary hoverIndicator label='Sign in here' />
          </WavyLink>
        </Box>
      )}
    </Box>
  );
};

export default StarReviewColumn;
