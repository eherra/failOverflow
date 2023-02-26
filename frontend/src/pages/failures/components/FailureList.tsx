import { Accordion, Box, Text, Button, ResponsiveContext, Spinner } from 'grommet';
import AccordionUnit from './accordion/AccordionUnit';
import { IFailure } from '../../../types';
import failureService from '../../../api/failures';
import CenteredLoadingSpinner from '../../common/CenteredLoadingSpinner';
import { useQuery } from 'react-query';
import DataFetchErrorMessage from '../../common/DataFetchErrorMessage';
import { useContext, useState } from 'react';
import { CaretDownFill, LinkUp } from 'grommet-icons';

const FailureList = () => {
  const screenSize = useContext(ResponsiveContext);
  const [limit, setLimit] = useState<number>(10);
  const [totalFailureCount, setTotalFailureCount] = useState<number>(10);
  const [isFetchingMoreFailures, setIsFetchingMoreFailures] = useState<boolean>(false);
  const { data, error, isFetching, refetch } = useQuery<IFailure[], Error>(
    'failures',
    async () => fetchAllFailures(limit),
    {
      refetchOnWindowFocus: false,
    },
  );

  const scrollToTop = () => {
    const element = document.getElementById('failures');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fetchAllFailures = async (limit: number) => {
    const { failures, failuresCount } = await failureService.getAllFailures(limit);
    setLimit((prev) => prev + 10);
    setTotalFailureCount(failuresCount);
    setIsFetchingMoreFailures(false);
    return failures;
  };

  if (error) {
    return <DataFetchErrorMessage />;
  }

  return (
    <>
      {isFetching && !isFetchingMoreFailures ? (
        <CenteredLoadingSpinner />
      ) : (
        <>
          {data?.length ? (
            <>
              <Accordion multiple pad={{ left: 'xlarge', right: 'xlarge' }}>
                {data.map((failure, index) => (
                  <AccordionUnit key={index} failure={failure} />
                ))}
              </Accordion>
              <Box
                align={['xsmall', 'small'].includes(screenSize) ? undefined : 'center'}
                pad='small'
                gap='small'
                direction='column'>
                <Text>
                  Showing {data.length}/{totalFailureCount} failures
                </Text>
                {data.length !== totalFailureCount ? (
                  <Button
                    icon={isFetchingMoreFailures ? <Spinner /> : <CaretDownFill />}
                    label={isFetchingMoreFailures ? 'Fetching...' : 'Show more'}
                    onClick={() => {
                      setIsFetchingMoreFailures(true);
                      refetch();
                    }}
                  />
                ) : (
                  <Button icon={<LinkUp />} label='Scroll to top' onClick={() => scrollToTop()} />
                )}
              </Box>
            </>
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
