import { Accordion, Box, Text } from 'grommet';
import { Alert } from 'grommet-icons';
import AccordionUnit from './accordion/AccordionUnit';
import { IFailure } from '../../../types';
import failureService from '../../../api/failures';
import CenteredLoadingSpinner from '../../common/CenteredLoadingSpinner';
import { useQuery } from 'react-query';
import { useNotificationContext } from '../../../context/NotificationContext';

const FailureList = () => {
  const { handleErrorNotification } = useNotificationContext();
  const { data, error, isFetching } = useQuery<IFailure[], Error>(
    'failures',
    async () => fetchAllFailures(),
    {
      refetchOnWindowFocus: false,
    },
  );

  const fetchAllFailures = async () => {
    try {
      const { failures } = await failureService.getAllFailures();
      return failures;
    } catch (err) {
      handleErrorNotification(err);
    }
  };

  console.log(data);
  console.log(error);
  console.log(isFetching);

  if (error) {
    return (
      <Box direction='row' gap='small'>
        <Alert />
        <Text>Something went wrong while fetching failures. Try again later.</Text>
      </Box>
    );
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
