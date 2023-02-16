import { useState } from 'react';
import { Box, NameValuePair, Button, Spinner } from 'grommet';
import { useUserContext } from '../../../../../../context/UserContext';
import failureService from '../../../../../../api/failures';
import { Like, Dislike } from 'grommet-icons';
import { useNotificationContext } from '../../../../../../context/NotificationContext';

interface IVoteColumn {
  failureId: string;
  votesAmount: number;
  hasUserVoted: boolean;
  setVotesData: ({
    votesAmount,
    hasUserVoted,
  }: {
    votesAmount: number;
    hasUserVoted: boolean;
  }) => void;
}

const VoteColumn = ({ failureId, votesAmount, hasUserVoted, setVotesData }: IVoteColumn) => {
  const { user } = useUserContext();
  const { createNotification } = useNotificationContext();

  const [isSendingVote, setIsSendingVote] = useState<boolean>(false);

  const handleVote = async (isDeletingVote: boolean) => {
    try {
      setIsSendingVote(true);
      await failureService.handleVoting({
        isDeletingVote,
        failureId,
        voterId: user?.id || '',
      });
      setIsSendingVote(false);
      setVotesData({
        votesAmount: hasUserVoted ? votesAmount - 1 : votesAmount + 1,
        hasUserVoted: !hasUserVoted,
      });
      const toastMessage = `Vote ${hasUserVoted ? 'removed' : 'added'} succesfully!`;
      createNotification({ message: toastMessage, icon: <Like color='#96ab9c' />, isError: false });
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
        {votesAmount}
      </NameValuePair>
      {user && (
        <>
          {hasUserVoted ? (
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
