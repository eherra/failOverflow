import { useState, useEffect } from 'react';
import failureService from '../../../../../api/failures';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import DataCard from '../DataCard';
import VoteDistributionChart from './VotesDistributionChart';

interface IVotesDistribution {
  date: string;
  amount: number;
}

const VotesDistributionCard = () => {
  const [votesData, setVotesData] = useState<Array<IVotesDistribution>>([]);
  const { handleError } = useNotificationContext();
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchVotesDistribution();
  }, []);

  const fetchVotesDistribution = async () => {
    try {
      const { voteDistribution } = await failureService.getVoteDistribution();
      setVotesData(voteDistribution);
    } catch (err) {
      handleError(err);
      setIsError(true);
    }
  };
  return (
    <DataCard
      heading='Votes received'
      chartText='Vote'
      isError={isError}
      chartField={<VoteDistributionChart votesData={votesData} />}
      hasData={!!votesData.length}
    />
  );
};

export default VotesDistributionCard;
