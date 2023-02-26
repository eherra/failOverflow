import { useQuery } from 'react-query';
import failureService from '../../../../../api/failures';
import DataCard from '../DataCard';
import VoteDistributionChart from './VotesDistributionChart';
import { Spinner } from 'grommet';
import { IDataDistribution } from '../../../../../types';

const VotesDistributionCard = () => {
  const { data, error, isFetching } = useQuery(
    'votesDistribution',
    async () => fetchVotesDistribution(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const fetchVotesDistribution = async () => {
    const { voteDistribution } = await failureService.getVoteDistribution();
    return voteDistribution;
  };

  const maxY = isFetching ? 0 : Math.max(...data.map((vote: IDataDistribution) => vote.amount)) + 1;

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <DataCard
          heading='Votes received'
          chartText='Votes'
          isFetching={isFetching}
          isError={error as boolean}
          chartField={<VoteDistributionChart votesData={data} maxY={maxY} />}
          hasData={!!data?.length}
        />
      )}
    </>
  );
};

export default VotesDistributionCard;
