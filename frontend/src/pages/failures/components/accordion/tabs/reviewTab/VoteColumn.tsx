import { useState } from 'react';
import { Box, NameValuePair, Button, Spinner } from 'grommet';
import { useUserContext } from '../../../../../../context/UserContext';
import failureService from '../../../../../../api/failures';
import { Like, Dislike, Alert } from 'grommet-icons';
import { useNotificationContext } from '../../../../../../context/NotificationContext';

interface IVoteColumn {
  failureId: string;
  votesAmount: number;
  hasUserVoted: boolean;
}

const VoteColumn = ({ failureId, votesAmount, hasUserVoted }: IVoteColumn) => {
  const { user } = useUserContext();
  const { createNotification } = useNotificationContext();

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
      const toastMessage = `Vote ${hasVoted ? 'removed' : 'added'} succesfully!`;
      createNotification({ message: toastMessage, icon: <Like />, isError: false });
    } catch (err) {
      console.log(err);
      createNotification({
        message: 'Something went wrong! Try again later.',
        isError: true,
      });
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
