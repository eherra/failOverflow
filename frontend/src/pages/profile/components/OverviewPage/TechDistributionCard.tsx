import { useState, useEffect } from 'react';
import { Box, Distribution, Card, Heading, CardHeader, Text, CardBody, Spinner } from 'grommet';
import failureService from '../../../../api/failures';

interface TechUsedData {
  value: number;
  color: string;
  name: string;
}

const listOfColors = ['graph-0', 'brand', 'light-5', 'graph-0'];

const TechDistributionCard = () => {
  const [techData, setTechData] = useState<Array<TechUsedData>>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchTechDistribution();
  }, []);

  const setColors = (data: Array<any>): Array<TechUsedData> => {
    // TODO: set that not same colour should appear
    const coloredMap: any = data.map((tech) => ({
      color: listOfColors[Math.floor(Math.random() * listOfColors.length)],
      ...tech,
    }));
    return coloredMap;
  };

  const fetchTechDistribution = async () => {
    try {
      setIsFetching(true);
      const { techDistribution } = await failureService.getTechDistribution();
      const coloredTechData = setColors(techDistribution);
      setTechData(coloredTechData);
      setIsFetching(false);
    } catch (err) {
      console.log(err);
      setIsFetching(false);
      setIsError(true);
    }
  };

  // TODO: Check that bar chars values are whole numbers

  return (
    <Card margin='medium' pad='medium'>
      <CardHeader align='start' direction='column' gap='xsmall'>
        <Heading level={2} size='small'>
          Your most used technologies
        </Heading>
      </CardHeader>
      <CardBody>
        {isError ? (
          <p>Couldnt fetch technologies distribution data</p>
        ) : (
          <>
            {isFetching ? (
              <Spinner size='large' />
            ) : (
              <Distribution values={techData}>
                {(value) => (
                  <Box pad='small' background={value.color} fill>
                    <Text size='large'>{value.name}</Text>
                  </Box>
                )}
              </Distribution>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default TechDistributionCard;
