import { StarRating, Form, FormField } from 'grommet';

const StarRatingForm = () => {
    const handleStarValueChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      event.preventDefault();
      console.log(event.target.value);
      // todo: call api to update start rating
    }
  
    return (
      <Form kind="survey">
        <FormField
          contentProps={{
            border: false,
          }}
          label="How would you rate this fail?"
          htmlFor="star-rating"
          name="rating"
          onChange={handleStarValueChange}
        >
          <StarRating name="rating" />
        </FormField>
      </Form>
    )
  };

export default StarRatingForm;
