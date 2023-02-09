import { useState } from 'react';
import { useUserContext } from '../../../../context/UserContext';
import { NameValuePair, Spinner } from 'grommet';
import failureService from '../../../../api/failures';
import { Rating } from 'react-simple-star-rating';

interface IStarRatingForm {
  failureId: string;
}

const StarRatingForm = ({ failureId }: IStarRatingForm) => {
  const { user } = useUserContext();
  const [isSendingRating, setiIsSendingRating] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);

  const handleStarValueChange = async (ratingValue: number) => {
    try {
      setiIsSendingRating(true);
      await failureService.sendRating({
        failureId,
        raterId: user?.id || '',
        ratingValue,
      });
      setiIsSendingRating(false);
      setRating(ratingValue);
    } catch (err) {
      console.log(err);
      setiIsSendingRating(false);
    }
  };
  const tooltipArray = [
    'Terrible',
    'Terrible+',
    'Bad',
    'Bad+',
    'Average',
    'Average+',
    'Great',
    'Great+',
    'Awesome',
    'Awesome+',
  ];
  return (
    <>
      <NameValuePair name='How would you rate this failure?'>
        {isSendingRating ? (
          <Spinner />
        ) : (
          <Rating
            onClick={handleStarValueChange}
            initialValue={rating}
            size={45}
            transition
            allowFraction
            showTooltip
            tooltipArray={tooltipArray}
          />
        )}
      </NameValuePair>
    </>
  );
};

export default StarRatingForm;
