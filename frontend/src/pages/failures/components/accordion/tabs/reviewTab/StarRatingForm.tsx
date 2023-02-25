import { useState } from 'react';
import { useUserContext } from '../../../../../../context/UserContext';
import { NameValuePair, Spinner } from 'grommet';
import failureService from '../../../../../../api/failures';
import { Rating } from 'react-simple-star-rating';
import { Star } from 'grommet-icons';
import { useNotificationContext } from '../../../../../../context/NotificationContext';

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

interface IStarRatingForm {
  failureId: string;
  userReview: number;
  setStarsData: ({ starAverage, userReview }: { starAverage: number; userReview: number }) => void;
}

const StarRatingForm = ({ failureId, userReview, setStarsData }: IStarRatingForm) => {
  const { createNotification, handleErrorNotification } = useNotificationContext();

  const [isSendingRating, setIsSendingRating] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(userReview);

  const handleStarValueChange = async (ratingValue: number) => {
    try {
      setIsSendingRating(true);
      const { updatedRatingData }: any = await failureService.sendRating({
        failureId,
        ratingValue,
      });
      setIsSendingRating(false);
      setRating(ratingValue);
      setStarsData({
        starAverage: updatedRatingData.ratingAverage,
        userReview: updatedRatingData.userRating,
      });
      createNotification({
        message: 'Review succesfully added!',
        icon: <Star color='#96ab9c' />,
        isError: false,
      });
    } catch (err) {
      handleErrorNotification(err);
      setIsSendingRating(false);
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
