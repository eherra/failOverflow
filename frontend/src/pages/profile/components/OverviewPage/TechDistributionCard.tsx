import React, { useState, useEffect } from 'react';
import { Box, Distribution, Card, Heading, CardHeader, Text, CardBody } from 'grommet';
import { overviewTechUsedData } from '../../../../mockData';

interface TechUsedData {
  value: number;
  color: string;
  name: string;
}

const TechDistributionCard = () => {
  const [techData, setTechData] = useState<Array<TechUsedData>>([]);

  useEffect(() => {
    setTechData(() => overviewTechUsedData.data);
  }, []);

  return (
    <Card margin='medium' pad='medium'>
      <CardHeader align='start' direction='column' gap='xsmall'>
        <Heading level={2} size='small'>
          Your most used technologies
        </Heading>
      </CardHeader>
      <CardBody>
        <Distribution values={techData}>
          {(value) => (
            <Box pad='small' background={value.color} fill>
              <Text size='large'>{value.name}</Text>
            </Box>
          )}
        </Distribution>
      </CardBody>
    </Card>
  );
};

export default TechDistributionCard;
