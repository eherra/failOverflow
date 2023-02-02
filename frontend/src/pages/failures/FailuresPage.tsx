import PageProvider from '../common/PageProvider';
import FailureList from './components/FailureList';
import { PageContent, PageHeader } from 'grommet';
import CreateYourOwnFailure from './components/CreateOwnFailureAction';

const FailuresPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader title='Failures' actions={<CreateYourOwnFailure />} />
        <FailureList />
      </PageContent>
    </PageProvider>
  );
};

export default FailuresPage;
