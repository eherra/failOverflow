import { useState } from 'react';
import { Box, Tab, NameValuePair, Button, NameValueList, Text, Spinner } from 'grommet';
import { useUserContext } from '../../../../../../context/UserContext';
import failureService from '../../../../../../api/failures';
import { Like, Dislike } from 'grommet-icons';

interface IVoteColumn {
  failureId: string;
  votesAmount: number;
  hasUserVoted: boolean;
}

const VoteColumn = ({ failureId, votesAmount, hasUserVoted }: IVoteColumn) => {
  const { user } = useUserContext();
  const [votes, setVotes] = useState<number>(votesAmount);
  const [isSendingVote, setIsSendingVote] = useState<boolean>(false);
  const [hasVoted, setHasVote] = useState<boolean>(hasUserVoted);

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
      setVotes((previousAmount) => (hasVoted ? previousAmount - 1 : previousAmount + 1));
    } catch (err) {
      console.log(err);
      setIsSendingVote(false);
    }
  };

  return (
    <Box direction='column' gap='medium'>
      <NameValuePair key='votes' name='Votes received'>
        {votes}
      </NameValuePair>
      {user && (
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
  );
};

export default VoteColumn;
