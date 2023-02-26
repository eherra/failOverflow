import { DataChart } from 'grommet';
import { IDataDistribution } from '../../../../../types';

interface IVoteDistributionChart {
  votesData: IDataDistribution[];
  maxY: number;
}

const VoteDistributionChart = ({ votesData, maxY }: IVoteDistributionChart) => {
  return (
    <DataChart
      bounds={{ y: [0, maxY] }}
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
