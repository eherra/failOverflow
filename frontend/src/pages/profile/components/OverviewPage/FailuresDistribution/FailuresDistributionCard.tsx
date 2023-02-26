import { useQuery } from 'react-query';
import { Spinner } from 'grommet';
import failureService from '../../../../../api/failures';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import DataCard from '../DataCard';
import FailureDistributionChart from './FailuresDistributionChart';

interface IFailureDistribution {
  date: string;
  amount: number;
}

const FailuresDistributionCard = () => {
  const { handleErrorNotification } = useNotificationContext();

  const { data, error, isFetching } = useQuery(
    'failureDistribution',
    async () => fetchFailuresCreatedDistribution(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const fetchFailuresCreatedDistribution = async () => {
    try {
      const { failureDistribution } = await failureService.getFailuresCreatedDistribution();
      return failureDistribution;
    } catch (error) {
      handleErrorNotification(error);
    }
  };

  const maxY = isFetching ? 0 : Math.max(...data.map((f: IFailureDistribution) => f.amount)) + 1;

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <DataCard
          heading='Failure creation distribution'
          chartText='Failures created'
          isError={error as boolean}
          chartField={<FailureDistributionChart failureData={data} maxY={maxY} />}
          hasData={!!data.length}
        />
      )}
    </>
  );
};

export default FailuresDistributionCard;
