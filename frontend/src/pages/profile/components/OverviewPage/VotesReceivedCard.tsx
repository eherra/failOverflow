import React, { useState, useEffect } from 'react';
import { Card, Heading, CardHeader, Text, CardBody, DataChart } from 'grommet';
import { overviewVotesData } from '../../../../mockData';

interface VotesData {
  date: string;
  amount: number;
}

const VotesReceivedCard = () => {
  const [votesData, setVotesData] = useState<Array<VotesData>>([]);

  useEffect(() => {
    setVotesData(() => overviewVotesData.data);
  }, []);

  return (
    <Card margin='medium' pad='medium'>
      <CardHeader align='start' direction='column' gap='xsmall'>
        <Heading level={2} size='small'>
          Votes received
        </Heading>
        <Text size='small'>Vote</Text>
      </CardHeader>
      <CardBody>
        <DataChart
          data={votesData}
          series={['date', { property: 'amount' }]}
          chart={[
            {
              property: 'amount',
              color: '#A7BEAE',
              type: 'line',
              opacity: 'medium',
              thickness: 'xsmall',
            },
            {
              property: 'amount',
              color: '#748579',
              type: 'point',
              point: 'triangleDown',
              thickness: 'medium',
            },
          ]}
          guide={{ x: { granularity: 'fine' } }}
        />
      </CardBody>
    </Card>
  );
};

export default VotesReceivedCard;
