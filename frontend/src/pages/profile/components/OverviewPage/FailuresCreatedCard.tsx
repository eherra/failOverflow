import React, { useState, useEffect } from 'react';
import { Card, Heading, CardHeader, Text, CardBody, DataChart } from 'grommet';
import { overviewFailuresCreatedData } from '../../../../mockData';

interface FailuredCreatedData {
  date: string,
  amount: number
}

const FailuresCreatedCard = () => {
  const [failureData, setFailureData] = useState<Array<FailuredCreatedData>>([]);

  useEffect(() => {
    setFailureData(() => overviewFailuresCreatedData.data)
  }, []);

  return (
    <Card
      margin="medium"
      pad="medium"
    >
      <CardHeader align="start" direction="column" gap="xsmall">
        <Heading level={2} size="small">
          Failures created
        </Heading>
        <Text size="small">Failure amount</Text>
      </CardHeader>
      <CardBody>
        <DataChart
          data={failureData}
          series={['date', 'amount', { property: 'amount' }]}
          chart={[
            { property: 'amount', color: "#A7BEAE" },
          ]}
        />
      </CardBody>
    </Card>
  )
};

export default FailuresCreatedCard;