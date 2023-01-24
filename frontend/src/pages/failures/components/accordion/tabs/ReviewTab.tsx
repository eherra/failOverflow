import React, { useState } from 'react';
import { Box, Tab, NameValuePair, Button, NameValueList } from 'grommet';
import StarRatingForm from '../StarRatingForm';

import {
  Like,
  Dislike
} from 'grommet-icons';

interface ReviewTabProps {
  stars: string,
  votes: number
}

const ReviewTab = ({ stars, votes }: ReviewTabProps) => {
  const [votesAmount, setVotesAmount] = useState<number>(votes);
  const [hasVoted, setHasVote] = useState<boolean>(false)
  const HAS_VOTED = true

  // TODO: get from backend if voted or not
  const handleVote = () => {
    setHasVote(previousVote => !previousVote)
    setVotesAmount(previousAmount => hasVoted ? previousAmount - 1 : previousAmount + 1)
  }

  return (
    <Tab title="Review">
      <Box gap="large" margin="large">
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout="grid"
          valueProps={{ width: 'medium' }}
          justifyContent="center">

          <Box direction='column' gap='medium'>
            <NameValuePair key={"starts"} name="Stars received">
              {stars}
            </NameValuePair>
            <StarRatingForm />
          </Box>

          <Box direction='column' gap='medium'>
            <NameValuePair key={"votes"} name="Votes received">
              {votesAmount}
            </NameValuePair>
            {hasVoted ? (
              <Button onClick={handleVote} icon={<Dislike />} label="Take your vote back" />
            ) : (
              <Button onClick={handleVote} primary icon={<Like />} label="Give a vote" />
            )}
          </Box>
        </NameValueList>
      </Box>
    </Tab>
  )
}

export default ReviewTab;