import { Accordion, Box, Text } from 'grommet';
import AccordionUnit from './accordion/AccordionUnit';
import { IFailure } from '../../../types';
import failureService from '../../../api/failures';
import CenteredLoadingSpinner from '../../common/CenteredLoadingSpinner';
import { useQuery } from 'react-query';
import DataFetchErrorMessage from '../../common/DataFetchErrorMessage';

const FailureList = () => {
  const { data, error, isFetching } = useQuery<IFailure[], Error>(
    'failures',
    async () => fetchAllFailures(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const fetchAllFailures = async () => {
    const { failures } = await failureService.getAllFailures();
    return failures;
  };

  if (error) {
    return <DataFetchErrorMessage />;
  }

  return (
    <>
      {isFetching ? (
        <CenteredLoadingSpinner />
      ) : (
        <>
          {data?.length ? (
            <Accordion multiple width='85%'>
              {data.map((failure, index) => (
                <AccordionUnit key={index} failure={failure} />
              ))}
            </Accordion>
          ) : (
            <Box direction='row' gap='small'>
              <Text>There are no failures to show.</Text>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default FailureList;
