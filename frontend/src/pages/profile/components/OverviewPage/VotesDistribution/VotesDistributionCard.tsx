import { useQuery } from 'react-query';
import failureService from '../../../../../api/failures';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import DataCard from '../DataCard';
import VoteDistributionChart from './VotesDistributionChart';
import { Spinner } from 'grommet';

const VotesDistributionCard = () => {
  const { handleErrorNotification } = useNotificationContext();
  const { data, error, isFetching } = useQuery(
    'votesDistribution',
    async () => fetchVotesDistribution(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const fetchVotesDistribution = async () => {
    try {
      const { voteDistribution } = await failureService.getVoteDistribution();
      return voteDistribution;
    } catch (err) {
      handleErrorNotification(err);
    }
  };
  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <DataCard
          heading='Votes received'
          chartText='Vote'
          isError={error as boolean}
          chartField={<VoteDistributionChart votesData={data} />}
          hasData={!!data?.length}
        />
      )}
    </>
  );
};

export default VotesDistributionCard;
