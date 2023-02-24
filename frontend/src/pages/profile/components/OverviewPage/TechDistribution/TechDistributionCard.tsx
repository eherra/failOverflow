import { useState, useEffect } from 'react';
import { useNotificationContext } from '../../../../../context/NotificationContext';
import { Spinner } from 'grommet';
import failureService from '../../../../../api/failures';
import DataCard from '../DataCard';
import TechDistributionChart from './TechDistributionChart';

interface ITechDistribution {
  value: number;
  color: string;
  name: string;
}

// more colours here
const listOfColors = ['graph-0', 'brand', 'light-5', 'graph-0'];

const TechDistributionCard = () => {
  const { handleError } = useNotificationContext();
  const [techData, setTechData] = useState<Array<ITechDistribution>>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    fetchTechDistribution();
  }, []);

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
      setIsFetching(true);
      const { techDistribution } = await failureService.getTechDistribution();
      const coloredTechData = setColors(techDistribution[0].techDistribution);
      setTechData(coloredTechData);
      setIsFetching(false);
    } catch (err) {
      handleError(err);
      setIsFetching(false);
      setIsError(true);
    }
  };

  return (
    <DataCard
      heading='Your most used technologies'
      isError={isError}
      chartField={
        isFetching ? <Spinner size='large' /> : <TechDistributionChart techData={techData} />
      }
      hasData={!!techData.length}
    />
  );
};

export default TechDistributionCard;
