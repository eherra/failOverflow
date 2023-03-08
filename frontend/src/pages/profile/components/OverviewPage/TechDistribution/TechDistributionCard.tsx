import failureService from '../../../../../api/failures';
import DataCard from '../DataCard';
import TechDistributionChart from './TechDistributionChart';
import { useQuery } from 'react-query';
import { listOfColors } from '../../../../utils/constants';

interface ITechData {
  value: number;
  name: string;
}

interface ITechDistribution extends ITechData {
  color: string;
}

const TechDistributionCard = () => {
  const { data, error, isFetching } = useQuery(
    'techDistribution',
    async () => fetchTechDistribution(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const setColors = (data: ITechData[]): ITechDistribution[] => {
    const shuffledColorStack = [...listOfColors].sort(() => Math.random() - 0.5);
    return data?.map((tech) => ({
      color: shuffledColorStack.pop() || '#ffb55a',
      ...tech,
    }));
  };

  const fetchTechDistribution = async () => {
    const { techDistribution } = await failureService.getTechDistribution();
    const coloredTechData = setColors(techDistribution[0].techDistribution);
    return coloredTechData;
  };

  return (
    <>
      <DataCard
        heading='Your most used technologies'
        isError={error as boolean}
        isFetching={isFetching}
        chartField={<TechDistributionChart techData={data || []} />}
        hasData={!!data?.length}
      />
    </>
  );
};

export default TechDistributionCard;
