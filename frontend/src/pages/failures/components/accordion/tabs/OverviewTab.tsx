import {
  Box,
  NameValueList,
  NameValuePair,
  Tab,
} from 'grommet';

interface OverviewProps {
  description: string,
  technologies: Array<string>,
  starRating: string,
  votes: number,
  timeOfCreation: string
}

const OverviewTab = ({ description, technologies, starRating, votes, timeOfCreation }: OverviewProps) => {
  return (
    <Tab title="Overview">
      <Box gap="small" margin="medium">
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout="grid"
          valueProps={{ width: 'small' }}
          justifyContent="center">
          <NameValuePair key={description} name="Description">
            {description}
          </NameValuePair>
          <NameValuePair key="tech" name="Technologies">
            {technologies.join(', ')}
          </NameValuePair>
          <NameValuePair key="star" name="Stars">
            {starRating}
          </NameValuePair>
          <NameValuePair key={votes} name="Total Votes">
            {votes}
          </NameValuePair>
          <NameValuePair key={timeOfCreation} name="Created">
            {timeOfCreation}
          </NameValuePair>
        </NameValueList>
      </Box>
    </Tab>
  )
}

export default OverviewTab;