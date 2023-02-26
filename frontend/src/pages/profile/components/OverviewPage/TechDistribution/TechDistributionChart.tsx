import { Box, Distribution, Text, Tip } from 'grommet';

interface ITechDistribution {
  value: number;
  color: string;
  name: string;
}

const TechDistributionChart = ({ techData }: { techData: Array<ITechDistribution> }) => {
  const totalSum = techData.reduce((accum, tech) => accum + tech.value, 0);
  return (
    <Distribution values={techData}>
      {(value) => (
        <Box pad='small' background={value.color} fill>
          <Tip
            content={
              <Box>
                {value.name} {((value.value / totalSum) * 100).toFixed(2)}%
              </Box>
            }>
            <Text size='large'>{value.name}</Text>
          </Tip>
        </Box>
      )}
    </Distribution>
  );
};

export default TechDistributionChart;
