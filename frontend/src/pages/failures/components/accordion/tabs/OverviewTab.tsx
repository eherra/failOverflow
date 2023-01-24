import {
  Box,
  NameValueList,
  NameValuePair,
  Tab,
} from 'grommet';

interface OverviewProps {
  description: string,
  solution: string,
  technologies: Array<string>,
  timeOfCreation: string
}

const OverviewTab = ({ description, solution, technologies, timeOfCreation }: OverviewProps) => {
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
          <NameValuePair key={solution} name="Solution">
            {solution}
          </NameValuePair>
          <NameValuePair key="tech" name="Technologies">
            {technologies.join(', ')}
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