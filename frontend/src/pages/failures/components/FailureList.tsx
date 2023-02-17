import { Accordion, Spinner, Box, Text } from 'grommet';
import { useState, useEffect } from 'react';
import AccordionUnit from './accordion/AccordionUnit';
import { Failure } from '../../../types';
import failureService from '../../../api/failures';

const FailureList = () => {
  const [failures, setFailures] = useState<Array<Failure>>([]);
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
      console.log(err);
      setIsFetchingFailures(false);
      setIsError(true);
    }
  };

  // TODO: better error message
  if (isError) {
    return <p>Error</p>;
  }

  return (
    <>
      {isFetchingFailures ? (
        <Spinner size='large' />
      ) : (
        <>
          {!failures.length ? (
            <Box direction='row' gap='small'>
              <Text>There are no failures to show.</Text>
            </Box>
          ) : (
            <Accordion multiple width='85%'>
              {failures?.map((failure, index) => (
                <AccordionUnit key={index} failure={failure} />
              ))}
            </Accordion>
          )}
        </>
      )}
    </>
  );
};

export default FailureList;
