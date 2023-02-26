import { Card, Heading, CardHeader, Text, CardBody, Spinner } from 'grommet';
import { ReactNode } from 'react';
import DataFetchErrorMessage from '../../../common/DataFetchErrorMessage';

interface IDataCard {
  heading: string;
  chartText?: string;
  isError: boolean;
  chartField: ReactNode;
  hasData: boolean;
  isFetching: boolean;
}

const DataCard = ({ heading, chartText, isError, chartField, hasData, isFetching }: IDataCard) => {
  return (
    <Card margin='medium' pad='medium'>
      <CardHeader align='start' direction='column' gap='xsmall'>
        <Heading level={2} size='small'>
          {heading}
        </Heading>
        {chartText && hasData && <Text size='small'>{chartText}</Text>}
      </CardHeader>
      <CardBody>
        {isFetching ? (
          <Spinner size='large' />
        ) : (
          <>
            {isError ? (
              <DataFetchErrorMessage />
            ) : (
              <>{hasData ? <>{chartField}</> : <p>No data to show.</p>}</>
            )}
          </>
        )}
      </CardBody>
    </Card>
  );
};

export default DataCard;
