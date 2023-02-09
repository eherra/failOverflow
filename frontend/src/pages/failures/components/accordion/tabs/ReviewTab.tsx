import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Tab, NameValuePair, Button, NameValueList, Text, Spinner } from 'grommet';
import { Like, Dislike } from 'grommet-icons';
import StarRatingForm from '../StarRatingForm';
import { Login } from 'grommet-icons';
import failureService from '../../../../../api/failures';
import { useUserContext } from '../../../../../context/UserContext';

interface IReviewTab {
  stars: string;
  votes: number;
  isAuth: boolean;
  failureId: string;
}

const ReviewTab = ({ stars, votes, isAuth, failureId }: IReviewTab) => {
  const { user } = useUserContext();
  const [votesAmount, setVotesAmount] = useState<number>(votes);
  const [isSendingVote, setIsSendingVote] = useState<boolean>(false);
  const [hasVoted, setHasVote] = useState<boolean>(false);

  // TODO: get from backend if voted or not and update vote amount
  const handleVote = async (isDeletingVote: boolean) => {
    try {
      setIsSendingVote(true);
      await failureService.handleVoting({
        isDeletingVote,
        failureId,
        voterId: user?.id || '',
      });
      setIsSendingVote(false);
      setHasVote((previousVote) => !previousVote);
      setVotesAmount((previousAmount) => (hasVoted ? previousAmount - 1 : previousAmount + 1));
    } catch (err) {
      console.log(err);
      setIsSendingVote(false);
    }
  };

  return (
    <Tab title='Review'>
      <Box gap='large' margin='large'>
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout='grid'
          valueProps={{ width: 'medium' }}
          justifyContent='center'>
          <Box direction='column' gap='medium'>
            <NameValuePair key='stars' name='Stars received'>
              {stars}
            </NameValuePair>
            {isAuth ? (
              <StarRatingForm failureId={failureId} />
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

          <Box direction='column' gap='medium'>
            <NameValuePair key='votes' name='Votes received'>
              {votesAmount}
            </NameValuePair>
            {isAuth && (
              <>
                {hasVoted ? (
                  <Button
                    icon={isSendingVote ? <Spinner /> : <Dislike />}
                    label={isSendingVote ? 'Removing vote' : 'Take your vote back'}
                    onClick={() => handleVote(true)}
                  />
                ) : (
                  <Button
                    icon={isSendingVote ? <Spinner /> : <Like />}
                    label={isSendingVote ? 'Giving vote' : 'Give a vote'}
                    onClick={() => handleVote(false)}
                    primary
                  />
                )}
              </>
            )}
          </Box>
        </NameValueList>
      </Box>
    </Tab>
  );
};

export default ReviewTab;
