import { useNotificationContext } from '../../../../../context/NotificationContext';
import { Spinner } from 'grommet';
import failureService from '../../../../../api/failures';
import DataCard from '../DataCard';
import TechDistributionChart from './TechDistributionChart';
import { useQuery } from 'react-query';

interface ITechDistribution {
  value: number;
  color: string;
  name: string;
}

// more colours here
const listOfColors = ['graph-0', 'brand', 'light-5', 'graph-0'];

const TechDistributionCard = () => {
  const { handleErrorNotification } = useNotificationContext();

  const { data, error, isFetching } = useQuery(
    'techDistribution',
    async () => fetchTechDistribution(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const setColors = (data: Array<any>): Array<ITechDistribution> => {
    // TODO: set that not same colour should appear
    const coloredMap: any = data?.map((tech) => ({
      color: listOfColors[Math.floor(Math.random() * listOfColors.length)],
      ...tech,
    }));
    return coloredMap;
  };

  const fetchTechDistribution = async () => {
    try {
      const { techDistribution } = await failureService.getTechDistribution();
      const coloredTechData = setColors(techDistribution[0].techDistribution);
      return coloredTechData;
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
          heading='Your most used technologies'
          isError={error as boolean}
          chartField={
            isFetching ? <Spinner size='large' /> : <TechDistributionChart techData={data || []} />
          }
          hasData={!!data?.length}
        />
      )}
    </>
  );
};

export default TechDistributionCard;
