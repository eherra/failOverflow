import { useState, useEffect } from 'react';
import { Rating } from 'react-simple-star-rating';
import { NameValuePair } from 'grommet';
import { Trophy } from 'grommet-icons';
import failureService from '../../../api/failures';
import { IFailureOfTheMonth } from '../../../types';
import FailureCard from './FailureCard';
import FailureCardHeading from './FailureCardHeading';
import { useNotificationContext } from '../../../context/NotificationContext';

const MostLikedFailureCard = () => {
  const [monthReview, setMonthReview] = useState<IFailureOfTheMonth | undefined>(undefined);
  const { handleError } = useNotificationContext();

  useEffect(() => {
    fetchFailureOfTheMonth();
  }, []);

  const fetchFailureOfTheMonth = async () => {
    try {
      const { failureOfTheMonth } = await failureService.getReviewOfTheMonth();
      setMonthReview(failureOfTheMonth[0]);
    } catch (err) {
      console.log(err);
      handleError(err);
    }
  };

  const reviewAverageAsFloat = monthReview?.reviewAverage || 0;
  const creator = monthReview?.creator[0];

  const MonthData = (
    <>
      <NameValuePair name={`Review average (${reviewAverageAsFloat})`}>
        <Rating readonly initialValue={reviewAverageAsFloat} allowFraction />
      </NameValuePair>
    </>
  );

  return (
    <FailureCard
      creator={creator}
      ownColumn={MonthData}
      heading={<FailureCardHeading heading='Failure of the Month' icon={<Trophy />} />}
      failure={monthReview}
    />
  );
};

export default MostLikedFailureCard;
