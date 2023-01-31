import { useContext } from 'react';
import PageProvider from '../common/PageProvider';
import FailureList from './components/FailureList';
import { Box, PageContent, PageHeader, Text, ResponsiveContext } from 'grommet';
import CreateFailureSideModal from '../common/CreateFailureSideModal/CreateFailureSideModal';

const FailuresPage = () => {
  const size = useContext(ResponsiveContext);
  return (
    <PageProvider>
      <PageContent>
        <PageHeader title='Failures' />
        <FailureList />
        <Box
          align={['xsmall', 'small'].includes(size) ? undefined : 'start'}
          pad={{ top: 'small', bottom: 'small' }}
          gap='small'>
          <Text weight='bold' size='medium'>
            Want to create your own?
          </Text>
          <CreateFailureSideModal />
        </Box>
      </PageContent>
    </PageProvider>
  );
};

export default FailuresPage;
