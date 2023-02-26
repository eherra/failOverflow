import { useQuery } from 'react-query';
import { Spinner } from 'grommet';
import failureService from '../../../../../api/failures';
import DataCard from '../DataCard';
import FailureDistributionChart from './FailuresDistributionChart';
import { IDataDistribution } from '../../../../../types';

const FailuresDistributionCard = () => {
  const { data, error, isFetching } = useQuery(
    'failureDistribution',
    async () => fetchFailuresCreatedDistribution(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const fetchFailuresCreatedDistribution = async () => {
    const { failureDistribution } = await failureService.getFailuresCreatedDistribution();
    return failureDistribution;
  };

  const maxY = isFetching ? 0 : Math.max(...data.map((f: IDataDistribution) => f.amount)) + 1;

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <DataCard
          heading='Failure creation distribution'
          chartText='Failures created'
          isFetching={isFetching}
          isError={error as boolean}
          chartField={<FailureDistributionChart failureData={data} maxY={maxY} />}
          hasData={!!data.length}
        />
      )}
    </>
  );
};

export default FailuresDistributionCard;
