import PageProvider from '../common/PageProvider';
import FailureList from './components/FailureList';
import { Heading } from 'grommet';

const FailuresPage = () => {
  return (
    <PageProvider>
      <Heading
        level={2}
        size="large"
      > Failure list
      </Heading>
      <FailureList />

    </PageProvider>
  );
};

export default FailuresPage;