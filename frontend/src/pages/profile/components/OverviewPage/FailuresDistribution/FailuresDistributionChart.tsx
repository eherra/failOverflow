import { DataChart } from 'grommet';
import { IDataDistribution } from '../../../../../types';

interface IFailureDistributionChart {
  failureData: IDataDistribution[];
  maxY: number;
}

const FailureDistributionChart = ({ failureData, maxY }: IFailureDistributionChart) => {
  return (
    <DataChart
      bounds={{ y: [0, maxY] }}
      data={failureData}
      series={['date', 'amount', { property: 'amount' }]}
      chart={[{ property: 'amount', color: '#A7BEAE' }]}
    />
  );
};

export default FailureDistributionChart;
