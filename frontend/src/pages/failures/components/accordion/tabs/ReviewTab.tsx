import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Tab, NameValuePair, Button, NameValueList, Text } from 'grommet';
import { Like, Dislike } from 'grommet-icons';
import StarRatingForm from '../StarRatingForm';
import { Login } from 'grommet-icons';

interface ReviewTabProps {
  stars: string;
  votes: number;
  isAuth: boolean;
}

const ReviewTab = ({ stars, votes, isAuth }: ReviewTabProps) => {
  const [votesAmount, setVotesAmount] = useState<number>(votes);
  const [hasVoted, setHasVote] = useState<boolean>(false);

  // TODO: get from backend if voted or not and update vote amount
  const handleVote = () => {
    setHasVote((previousVote) => !previousVote);
    setVotesAmount((previousAmount) => (hasVoted ? previousAmount - 1 : previousAmount + 1));
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
              <StarRatingForm />
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
                  <Button onClick={handleVote} icon={<Dislike />} label='Take your vote back' />
                ) : (
                  <Button onClick={handleVote} primary icon={<Like />} label='Give a vote' />
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
