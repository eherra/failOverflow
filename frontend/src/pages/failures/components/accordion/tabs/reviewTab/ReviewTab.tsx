import { Box, Tab, NameValueList, Spinner } from 'grommet';
import failureService from '../../../../../../api/failures';
import { useUserContext } from '../../../../../../context/UserContext';
import StarReviewColumn from './StarReviewColumn';
import VoteColumn from './VoteColumn';
import { Like } from 'grommet-icons';
import { useQuery } from 'react-query';
import DataFetchErrorMessage from '../../../../../common/DataFetchErrorMessage';

interface IReviewTab {
  failureId: string;
}

const ReviewTab = ({ failureId }: IReviewTab) => {
  const { user } = useUserContext();

  const reviews = useQuery(['reviews', failureId], async () => fetchReviewData(), {
    refetchOnWindowFocus: false,
  });

  const votes = useQuery(['votes', failureId], async () => fetchVotesData(), {
    refetchOnWindowFocus: false,
  });

  const fetchReviewData = async () => {
    const { ratingData } = await failureService.getRatingData(failureId, user?.id || '');
    return {
      starAverage: ratingData?.ratingAverage,
      userReview: ratingData?.userRating,
    };
  };

  const fetchVotesData = async () => {
    const voteResponse = await failureService.getVotingData(failureId, user?.id || '');
    return {
      votesAmount: voteResponse?.votesAmount,
      hasUserVoted: voteResponse?.hasUserVoted,
    };
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
                <DataFetchErrorMessage />
              ) : (
                <StarReviewColumn
                  failureId={failureId}
                  userReview={reviews?.data?.userReview}
                  reviewAverage={reviews?.data?.starAverage}
                />
              )}
              {votes.error ? (
                <DataFetchErrorMessage />
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
