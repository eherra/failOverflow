import { useState } from 'react';
import { useUserContext } from '../../../../../../context/UserContext';
import { NameValuePair, Spinner } from 'grommet';
import failureService from '../../../../../../api/failures';
import { Rating } from 'react-simple-star-rating';
import { Star } from 'grommet-icons';
import ToastNotification from '../../../../../common/ToastNotification';

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

  const [isToastVisible, setIsToastVisible] = useState<boolean>(false);
  const [isSendingRating, setiIsSendingRating] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(userReview);

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
      setIsToastVisible(true);
    } catch (err) {
      console.log(err);
      setiIsSendingRating(false);
    }
  };

  return (
    <>
      {isToastVisible && (
        <ToastNotification
          setIsVisible={setIsToastVisible}
          icon={<Star />}
          toastMessage='Star review succesfully added!'
        />
      )}
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
