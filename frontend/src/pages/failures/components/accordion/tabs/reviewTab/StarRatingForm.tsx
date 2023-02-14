import { useState } from 'react';
import { useUserContext } from '../../../../../../context/UserContext';
import { NameValuePair, Spinner } from 'grommet';
import failureService from '../../../../../../api/failures';
import { Rating } from 'react-simple-star-rating';
import { Star } from 'grommet-icons';
import { useNotificationContext } from '../../../../../../context/NotificationContext';

interface IStarRatingForm {
  failureId: string;
  userReview: number;
}

const tooltipArray = [
  'Terrible',
  'Terrible+',
  'Bad',
  'Bad+',
  'Ok',
  'Ok+',
  'Great',
  'Great+',
  'Awesome',
  'Much wow',
];

const StarRatingForm = ({ failureId, userReview }: IStarRatingForm) => {
  const { user } = useUserContext();
  const { createNotification } = useNotificationContext();

  const [isSendingRating, setIsSendingRating] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(userReview);

  const handleStarValueChange = async (ratingValue: number) => {
    try {
      setIsSendingRating(true);
      await failureService.sendRating({
        failureId,
        raterId: user?.id || '',
        ratingValue,
      });
      setIsSendingRating(false);
      setRating(ratingValue);
      createNotification({
        message: 'Star review succesfully added!',
        icon: <Star />,
        isError: false,
      });
    } catch (err) {
      console.log(err);
      setIsSendingRating(false);
      createNotification({
        message: 'Something went wrong! Try again later.',
        isError: true,
      });
    }
  };

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
            tooltipStyle={{ background: '#A7BEAE', color: '#454545', fontStyle: 'Roboto' }}
            tooltipArray={tooltipArray}
          />
        )}
      </NameValuePair>
    </>
  );
};

export default StarRatingForm;
