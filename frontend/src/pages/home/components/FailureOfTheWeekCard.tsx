import { useState, useEffect } from 'react';
import { NameValuePair, Box, Text } from 'grommet';
import { Like } from 'grommet-icons';
import failureService from '../../../api/failures';
import { IFailureOfTheWeek } from '../../../types';
import FailureCard from './FailureCard';
import FailureCardHeading from './FailureCardHeading';
import { useNotificationContext } from '../../../context/NotificationContext';

const FailureOfTheWeekCard = () => {
  const [weekFailure, setWeekFailure] = useState<IFailureOfTheWeek | undefined>(undefined);
  const { handleError } = useNotificationContext();

  useEffect(() => {
    fetchFailureOfTheWeek();
  }, []);

  const fetchFailureOfTheWeek = async () => {
    try {
      const { failureOfTheWeek } = await failureService.getFailureOfTheWeek();
      setWeekFailure(failureOfTheWeek);
    } catch (err) {
      handleError(err);
    }
  };

  const creator = weekFailure?.creator[0];
  return (
    <FailureCard
      creator={creator}
      ownColumn={
        <NameValuePair name='Votes acquired'>
          <Box gap='small' direction='row' alignContent='center'>
            <Like color='#96ab9c' />
            <Text weight={400} size='medium'>
              {weekFailure?.totalVotes}
            </Text>
          </Box>
        </NameValuePair>
      }
      heading={
        <FailureCardHeading
          heading='Failure of the Week'
          tipContent='Failure which has received most votes during current week.'
        />
      }
      failure={weekFailure}
    />
  );
};

export default FailureOfTheWeekCard;
