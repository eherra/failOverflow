import PageProvider from '../common/PageProvider';
import FailureList from './components/FailureList';
import { Page, PageContent, PageHeader } from 'grommet';

const FailuresPage = () => {
  return (
    <PageProvider>
      <Page>
        <PageContent>
          <PageHeader
            title="Failures"
          />
          <FailureList />
        </PageContent>
      </Page>

    </PageProvider>
  );
};

export default FailuresPage;