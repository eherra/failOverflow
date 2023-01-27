import PageProvider from '../common/PageProvider';
import FailureList from './components/FailureList';
import { Box, PageContent, PageHeader, Text } from 'grommet';
import CreateFailureSideModal from '../common/CreateFailureSideModal/CreateFailureSideModal';

const FailuresPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          title="Failures"
        />
        <FailureList />
        <Box
          direction='column'
          gap="small"
          pad="small"
          width="20%">
          <Text weight="bold" size="medium">Want to create your own?</Text>
          <CreateFailureSideModal />
        </Box>
      </PageContent>
    </PageProvider>
  );
};

export default FailuresPage;