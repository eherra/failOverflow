import { DataChart } from 'grommet';

interface IVotesDistribution {
  date: string;
  amount: number;
}

const VoteDistributionChart = ({ votesData }: { votesData: Array<IVotesDistribution> }) => {
  return (
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
  );
};

export default VoteDistributionChart;
