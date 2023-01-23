import { Tab, Box, NameValuePair, Button, NameValueList } from 'grommet';
import StarRatingForm from '../StarRatingForm';

const ReviewTab = () => {
  return (
    <Tab title="Review">
      <Box gap="large" margin="large">
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout="grid"
          valueProps={{ width: 'small' }}
          justifyContent="center">
          <StarRatingForm />
          <NameValuePair key={"vote"} name="Vote failure">
            <Button primary label="Vote" />
          </NameValuePair>
        </NameValueList>
      </Box>
    </Tab>
  )
}

export default ReviewTab;