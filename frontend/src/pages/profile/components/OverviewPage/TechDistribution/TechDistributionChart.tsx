import { Box, Distribution, Text } from 'grommet';

interface ITechDistribution {
  value: number;
  color: string;
  name: string;
}

const TechDistributionChart = ({ techData }: { techData: Array<ITechDistribution> }) => {
  return (
    <Distribution values={techData}>
      {(value) => (
        <Box pad='small' background={value.color} fill>
          <Text size='large'>{value.name}</Text>
        </Box>
      )}
    </Distribution>
  );
};

export default TechDistributionChart;
