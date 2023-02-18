import { Card, Heading, CardHeader, Text, CardBody } from 'grommet';
import { ReactNode } from 'react';

interface IDataCard {
  heading: string;
  chartText?: string;
  isError: boolean;
  chartField: ReactNode;
  hasData?: boolean;
}

const DataCard = ({ heading, chartText, isError, chartField, hasData }: IDataCard) => {
  console.log(hasData);
  return (
    <Card margin='medium' pad='medium'>
      <CardHeader align='start' direction='column' gap='xsmall'>
        <Heading level={2} size='small'>
          {heading}
        </Heading>
        {chartText && hasData && <Text size='small'>{chartText}</Text>}
      </CardHeader>
      {hasData ? (
        <CardBody>{isError ? <p>Couldnt fetch data.</p> : <>{chartField}</>}</CardBody>
      ) : (
        <p>No data to show.</p>
      )}
    </Card>
  );
};

export default DataCard;
