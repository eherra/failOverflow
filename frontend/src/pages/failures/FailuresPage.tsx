import PageProvider from '../common/PageProvider';
import FailureList from './components/FailureList';
import { Heading } from 'grommet';

const FailuresPage = () => {
  return (
    <PageProvider>
      <Heading
        level={2}
        size="large"
      >Failures
      </Heading>
      <div style={{ marginLeft: '2em' }} >
        <FailureList />
      </div>

    </PageProvider>
  );
};

export default FailuresPage;