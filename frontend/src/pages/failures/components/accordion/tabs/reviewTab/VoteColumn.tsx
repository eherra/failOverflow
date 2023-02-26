import { Box, NameValuePair, Button, Spinner } from 'grommet';
import { useUserContext } from '../../../../../../context/UserContext';
import { handleVoting } from '../../../../../../api/failures';
import { Like, Dislike } from 'grommet-icons';
import { useNotificationContext } from '../../../../../../context/NotificationContext';
import { useMutation, useQueryClient } from 'react-query';

interface IVoteColumn {
  failureId: string;
  votesAmount: number;
  hasUserVoted: boolean;
}

const VoteColumn = ({ failureId, votesAmount, hasUserVoted }: IVoteColumn) => {
  const { user } = useUserContext();
  const { handleErrorNotification, createNotification } = useNotificationContext();
  const queryClient = useQueryClient();

  const newVoteMutation = useMutation(handleVoting, {
    onSuccess: () => {
      queryClient.setQueryData(['votes', failureId], {
        votesAmount: hasUserVoted ? votesAmount - 1 : votesAmount + 1,
        hasUserVoted: !hasUserVoted,
      });
      const toastMessage = `Vote ${hasUserVoted ? 'removed' : 'added'} succesfully!`;
      createNotification({
        message: toastMessage,
        icon: <Like color='#96ab9c' />,
        isError: false,
      });
    },
    onError: (error) => {
      handleErrorNotification(error);
    },
  });

  const handleVote = async (isDeletingVote: boolean) => {
    newVoteMutation.mutate({
      isDeletingVote,
      failureId,
    });
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
              icon={newVoteMutation.isLoading ? <Spinner /> : <Dislike />}
              label={newVoteMutation.isLoading ? 'Removing vote' : 'Take your vote back'}
              onClick={() => handleVote(true)}
            />
          ) : (
            <Button
              icon={newVoteMutation.isLoading ? <Spinner /> : <Like />}
              label={newVoteMutation.isLoading ? 'Giving vote' : 'Give a vote'}
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
