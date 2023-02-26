import { useState } from 'react';
import { NameValuePair, Spinner } from 'grommet';
import { handleRating } from '../../../../../../api/failures';
import { Rating } from 'react-simple-star-rating';
import { Star } from 'grommet-icons';
import { useNotificationContext } from '../../../../../../context/NotificationContext';
import { useMutation, useQueryClient } from 'react-query';

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
}

const StarRatingForm = ({ failureId, userReview }: IStarRatingForm) => {
  const { createNotification, handleErrorNotification } = useNotificationContext();
  const queryClient = useQueryClient();

  const [rating, setRating] = useState<number>(userReview);

  const newReviewMutation = useMutation(handleRating, {
    onSuccess: (data) => {
      const { updatedRatingData } = data;
      queryClient.setQueryData(['reviews', failureId], {
        starAverage: updatedRatingData.ratingAverage,
        userReview: updatedRatingData.userRating,
      });
      createNotification({
        message: 'Review succesfully added!',
        icon: <Star color='#96ab9c' />,
        isError: false,
      });
      setRating(updatedRatingData.userRating);
    },
    onError: (error) => {
      handleErrorNotification(error);
    },
  });

  const handleStarValueChange = async (ratingValue: number) => {
    newReviewMutation.mutate({
      failureId,
      ratingValue,
    });
  };

  return (
    <>
      <NameValuePair name='How would you rate this failure?'>
        {newReviewMutation.isLoading ? (
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
