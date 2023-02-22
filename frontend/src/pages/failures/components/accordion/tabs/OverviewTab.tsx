import { Box, NameValueList, NameValuePair, Tab } from 'grommet';
import { createStyledDateInfo } from '../../../../../utils/TimeUtils';
import { Overview } from 'grommet-icons';
import TruncateText from '../../../../common/Truncates/texts/TruncateText';

interface IOverview {
  description: string;
  solution: string;
  technologies: Array<string>;
  createdAt: string;
}

const OverviewTab = ({ description, solution, technologies, createdAt }: IOverview) => {
  return (
    <Tab title='Overview' icon={<Overview />}>
      <Box gap='small' margin='medium'>
        <NameValueList
          pairProps={{ direction: 'column' }}
          layout='grid'
          valueProps={{ width: 'small' }}
          justifyContent='center'>
          <NameValuePair name='Description'>
            <TruncateText text={description} />
          </NameValuePair>
          <NameValuePair name='Solution'>
            <TruncateText text={solution} />
          </NameValuePair>
          <NameValuePair name='Technologies'>{technologies.join(', ')}</NameValuePair>
          <NameValuePair name='Created'>{createStyledDateInfo(createdAt)}</NameValuePair>
        </NameValueList>
      </Box>
    </Tab>
  );
};

export default OverviewTab;
