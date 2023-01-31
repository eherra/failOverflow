import LoginForm from './components/LoginForm';
import PageProvider from '../../../common/PageProvider';
import { PageContent, PageHeader } from 'grommet';
import HeaderBackLink from '../../../common/HeaderBackLink';

const LoginPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          parent={<HeaderBackLink label='Return homepage' link='/landing' />}
          title='Login to Failover Flow'
        />
        <LoginForm />
      </PageContent>
    </PageProvider>
  );
};

export default LoginPage;
