import { useState, useEffect } from 'react';
import { Card, Heading, CardHeader, Text, CardBody, DataChart, Spinner } from 'grommet';
import failureService from '../../../../api/failures';

interface FailuredCreatedData {
  date: string;
  amount: number;
}

const FailuresCreatedCard = () => {
  const [failureData, setFailureData] = useState<Array<FailuredCreatedData>>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchFailuresCreatedDistribution();
  }, []);

  const fetchFailuresCreatedDistribution = async () => {
    try {
      setIsFetching(true);
      const { failureDistribution } = await failureService.getFailuresCreatedDistribution();
      setFailureData(failureDistribution);
      console.log(failureDistribution);
      setIsFetching(false);
    } catch (err) {
      console.log(err);
      setIsFetching(false);
      setIsError(true);
    }
  };

  return (
    <Card margin='medium' pad='medium'>
      <CardHeader align='start' direction='column' gap='xsmall'>
        <Heading level={2} size='small'>
          Failures created
        </Heading>
        <Text size='small'>Failure amount</Text>
      </CardHeader>
      <CardBody>
        {isError ? (
          <p>Couldnt failure creation distribution data</p>
        ) : (
          <>
            {isFetching ? (
              <Spinner size='large' />
            ) : (
              <DataChart
                data={failureData}
                series={['date', 'amount', { property: 'amount' }]}
                chart={[{ property: 'amount', color: '#A7BEAE' }]}
              />
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default FailuresCreatedCard;
