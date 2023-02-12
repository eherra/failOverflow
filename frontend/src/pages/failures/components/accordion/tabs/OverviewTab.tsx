import { Box, NameValueList, NameValuePair, Tab } from 'grommet';
import { createStyledDateInfo } from '../../../../../utils/TimeUtils';

interface IOverview {
  description: string;
  solution: string;
  technologies: Array<string>;
  createdAt: string;
}

const OverviewTab = ({ description, solution, technologies, createdAt }: IOverview) => {
  return (
    <Tab title='Overview'>
      <Box gap='small' margin='medium'>
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout='grid'
          valueProps={{ width: 'small' }}
          justifyContent='center'>
          <NameValuePair key={description} name='Description'>
            {description}
          </NameValuePair>
          <NameValuePair key={solution} name='Solution'>
            {solution}
          </NameValuePair>
          <NameValuePair key='tech' name='Technologies'>
            {technologies.join(', ')}
          </NameValuePair>
          <NameValuePair key={createdAt} name='Created'>
            {createStyledDateInfo(createdAt)}
          </NameValuePair>
        </NameValueList>
      </Box>
    </Tab>
  );
};

export default OverviewTab;
