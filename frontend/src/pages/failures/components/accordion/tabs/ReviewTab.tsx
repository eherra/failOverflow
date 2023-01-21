import { Tab, Box, NameValuePair, StarRating, Button, NameValueList } from 'grommet';

const ReviewTab = () => {
  return (
    <Tab title="Review">
      <Box gap="large" margin="large">
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout="grid"
          valueProps={{ width: 'small' }}
          justifyContent="center">
          <NameValuePair key={"description"} name="Give stars">
            <StarRating name="perkele" />
          </NameValuePair>
          <NameValuePair key={"vote"} name="Vote failure">
            <Button primary label="Vote" />
          </NameValuePair>
        </NameValueList>
      </Box>
    </Tab>
  )
}

export default ReviewTab;