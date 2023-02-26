import { Box, Tab, NameValueList, Spinner } from 'grommet';
import failureService from '../../../../../../api/failures';
import { useUserContext } from '../../../../../../context/UserContext';
import StarReviewColumn from './StarReviewColumn';
import VoteColumn from './VoteColumn';
import { Like } from 'grommet-icons';
import { useNotificationContext } from '../../../../../../context/NotificationContext';
import { useQuery } from 'react-query';

interface IReviewTab {
  failureId: string;
}

const ReviewTab = ({ failureId }: IReviewTab) => {
  const { user } = useUserContext();
  const { handleErrorNotification } = useNotificationContext();

  const reviews = useQuery(['reviews', failureId], async () => fetchReviewData(), {
    refetchOnWindowFocus: false,
  });

  const votes = useQuery(['votes', failureId], async () => fetchVotesData(), {
    refetchOnWindowFocus: false,
  });

  const fetchReviewData = async () => {
    try {
      const { ratingData } = await failureService.getRatingData(failureId, user?.id || '');
      return {
        starAverage: ratingData?.ratingAverage,
        userReview: ratingData?.userRating,
      };
    } catch (err) {
      handleErrorNotification(err);
    }
  };

  const fetchVotesData = async () => {
    try {
      const voteResponse = await failureService.getVotingData(failureId, user?.id || '');
      return {
        votesAmount: voteResponse?.votesAmount,
        hasUserVoted: voteResponse?.hasUserVoted,
      };
    } catch (err) {
      handleErrorNotification(err);
    }
  };

  return (
    <Tab title='Review' icon={<Like />}>
      <Box gap='large' margin='large'>
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout='grid'
          valueProps={{ width: 'medium' }}
          justifyContent='center'>
          {votes.isFetching || reviews.isFetching ? (
            <Spinner size='large' />
          ) : (
            <>
              {reviews.error ? (
                <p>Error while fetching review data.</p>
              ) : (
                <StarReviewColumn
                  failureId={failureId}
                  userReview={reviews?.data?.userReview}
                  reviewAverage={reviews?.data?.starAverage}
                />
              )}
              {votes.error ? (
                <p>Error while fetching vote data.</p>
              ) : (
                <VoteColumn
                  failureId={failureId}
                  votesAmount={votes?.data?.votesAmount}
                  hasUserVoted={votes?.data?.hasUserVoted}
                />
              )}
            </>
          )}
        </NameValueList>
      </Box>
    </Tab>
  );
};

export default ReviewTab;
