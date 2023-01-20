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
  dateOfCreation: string
}

const OverviewTab = ({ description, technologies, starRating, votes, dateOfCreation }: OverviewProps) => {
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
          <NameValuePair key={dateOfCreation} name="Created">
            {dateOfCreation}
          </NameValuePair>
        </NameValueList>
      </Box>
    </Tab>
  )
}

export default OverviewTab;