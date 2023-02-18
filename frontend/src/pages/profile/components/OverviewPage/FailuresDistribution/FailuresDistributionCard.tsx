import { useState, useEffect } from 'react';
import failureService from '../../../../../api/failures';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import DataCard from '../DataCard';
import FailureDistributionChart from './FailuresDistributionChart';

interface IFailureDistribution {
  date: string;
  amount: number;
}

const FailuresDistributionCard = () => {
  const { handleError } = useNotificationContext();
  const [failureData, setFailureData] = useState<Array<IFailureDistribution>>([]);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchFailuresCreatedDistribution();
  }, []);

  const fetchFailuresCreatedDistribution = async () => {
    try {
      const { failureDistribution } = await failureService.getFailuresCreatedDistribution();
      setFailureData(failureDistribution);
    } catch (error) {
      handleError(error);
      setIsError(true);
    }
  };

  const maxY = Math.max(...failureData.map((f: IFailureDistribution) => f.amount)) + 1;

  return (
    <DataCard
      heading='Failure creation distribution'
      chartText='Failures created'
      isError={isError}
      chartField={<FailureDistributionChart failureData={failureData} maxY={maxY} />}
      hasData={!!failureData.length}
    />
  );
};

export default FailuresDistributionCard;
