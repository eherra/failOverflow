import PageProvider from '../common/PageProvider';
import FailureList from './components/FailureList';
import { Page, PageContent, PageHeader } from 'grommet';

const FailuresPage = () => {
  return (
    <PageProvider>
        <PageContent>
          <PageHeader
            title="Failures"
          />
          <FailureList />
        </PageContent>
    </PageProvider>
  );
};

export default FailuresPage;