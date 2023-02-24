import { Accordion, Box, Text } from 'grommet';
import { Alert } from 'grommet-icons';
import { useState, useEffect } from 'react';
import AccordionUnit from './accordion/AccordionUnit';
import { IFailure } from '../../../types';
import failureService from '../../../api/failures';
import CenteredLoadingSpinner from '../../common/CenteredLoadingSpinner';

const FailureList = () => {
  const [failures, setFailures] = useState<Array<IFailure>>([]);
  const [isFetchingFailures, setIsFetchingFailures] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    fetchAllFailures();
  }, []);

  const fetchAllFailures = async () => {
    try {
      setIsFetchingFailures(true);
      const { failures } = await failureService.getAllFailures();
      setFailures(failures);
      setIsFetchingFailures(false);
    } catch (err) {
      setIsFetchingFailures(false);
      setIsError(true);
    }
  };

  if (isError) {
    return (
      <Box direction='row' gap='small'>
        <Alert />
        <Text>Something went wrong while fetching failures. Try again later.</Text>
      </Box>
    );
  }

  return (
    <>
      {isFetchingFailures ? (
        <CenteredLoadingSpinner />
      ) : (
        <>
          {failures.length ? (
            <Accordion multiple width='85%'>
              {failures.map((failure, index) => (
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
