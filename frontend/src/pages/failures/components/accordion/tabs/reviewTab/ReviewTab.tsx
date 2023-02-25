import { useState, useEffect } from 'react';
import { Box, Tab, NameValueList, Spinner } from 'grommet';
import failureService from '../../../../../../api/failures';
import { useUserContext } from '../../../../../../context/UserContext';
import StarReviewColumn from './StarReviewColumn';
import VoteColumn from './VoteColumn';
import { Like } from 'grommet-icons';
import { useNotificationContext } from '../../../../../../context/NotificationContext';

interface IReviewTab {
  failureId: string;
}

const ReviewTab = ({ failureId }: IReviewTab) => {
  const { user } = useUserContext();
  const { handleErrorNotification } = useNotificationContext();
  const [isLoadingData, setIsLoading] = useState<boolean>(false);
  const [isVoteFetchError, setIsVoteFetchError] = useState<boolean>(false);
  const [isRatingFetchError, setIsRatingFetchError] = useState<boolean>(false);

  const [starsData, setStarsData] = useState({
    starAverage: 0,
    userReview: 0,
  });

  const [votesData, setVotesData] = useState({
    votesAmount: 0,
    hasUserVoted: false,
  });

  useEffect(() => {
    setIsLoading(true);
    fetchReviewData();
    fetchVotesData();
    setIsLoading(false);
  }, []);

  const fetchReviewData = async () => {
    try {
      const { ratingData } = await failureService.getRatingData(failureId, user?.id || '');
      setStarsData({
        starAverage: ratingData?.ratingAverage,
        userReview: ratingData?.userRating,
      });
    } catch (err) {
      handleErrorNotification(err);
      setIsRatingFetchError(true);
    }
  };

  const fetchVotesData = async () => {
    try {
      const voteResponse = await failureService.getVotingData(failureId, user?.id || '');
      setVotesData({
        votesAmount: voteResponse?.votesAmount,
        hasUserVoted: voteResponse?.hasUserVoted,
      });
    } catch (err) {
      handleErrorNotification(err);
      setIsVoteFetchError(true);
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
          {isLoadingData ? (
            <Spinner size='large' />
          ) : (
            <>
              {isRatingFetchError ? (
                <p>Error while fetching review data</p>
              ) : (
                <StarReviewColumn
                  setStarsData={setStarsData}
                  failureId={failureId}
                  userReview={starsData?.userReview}
                  reviewAverage={starsData?.starAverage}
                />
              )}
              {isVoteFetchError ? (
                <p>Error while fetching vote data</p>
              ) : (
                <VoteColumn
                  setVotesData={setVotesData}
                  failureId={failureId}
                  votesAmount={votesData.votesAmount}
                  hasUserVoted={votesData.hasUserVoted}
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
