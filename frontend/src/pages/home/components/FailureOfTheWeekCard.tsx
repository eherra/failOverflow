import { useState, useEffect } from 'react';
import { NameValuePair } from 'grommet';
import { Calendar } from 'grommet-icons';
import failureService from '../../../api/failures';
import { IFailureOfTheWeek } from '../../../types';
import FailureCard from './FailureCard';
import FailureCardHeading from './FailureCardHeading';

const VoteOfTheWeekCard = () => {
  const [weekFailure, setWeekFailure] = useState<IFailureOfTheWeek | undefined>(undefined);

  useEffect(() => {
    fetchFailureOfTheWeek();
  }, []);

  const fetchFailureOfTheWeek = async () => {
    try {
      const { failureOfTheWeek } = await failureService.getFailureOfTheWeek();
      setWeekFailure(failureOfTheWeek[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const creator = weekFailure?.creator[0];

  return (
    <FailureCard
      creator={creator}
      ownColumn={<NameValuePair name='Votes acquired'>{weekFailure?.totalVotes}</NameValuePair>}
      heading={<FailureCardHeading heading='Failure of the Week' icon={<Calendar />} />}
      failure={weekFailure}
    />
  );
};

export default VoteOfTheWeekCard;