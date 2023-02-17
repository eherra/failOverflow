import { useState, useEffect } from 'react';
import { Card, Heading, CardHeader, Text, CardBody, DataChart, Spinner } from 'grommet';
import failureService from '../../../../api/failures';
import { useNotificationContext } from '../../../../context/NotificationContext';

interface FailuredCreatedData {
  date: string;
  amount: number;
}

const FailuresCreatedCard = () => {
  const { handleError } = useNotificationContext();
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
    } catch (error: any) {
      handleError(error);
      setIsFetching(false);
      setIsError(true);
    }
  };

  const maxYValue = Math.max(...failureData.map((f: FailuredCreatedData) => f.amount)) + 1;

  return (
    <Card margin='medium' pad='medium'>
      <CardHeader align='start' direction='column' gap='xsmall'>
        <Heading level={2} size='small'>
          Failure creation distribution
        </Heading>
        <Text size='small'>Failures created</Text>
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
                bounds={{ y: [0, maxYValue] }}
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
