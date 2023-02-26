import PageProvider from '../../../common/PageProvider';
import { PageContent, PageHeader } from 'grommet';
import RegisterForm from './components/RegisterForm';
import HeaderBackLink from '../../../common/HeaderBackLink';

const RegisterPage = () => {
  return (
    <PageProvider>
      <PageContent>
        <PageHeader
          parent={<HeaderBackLink label='Return frontpage' link='/landing' />}
          title='Register to Failover Flow'
        />
        <RegisterForm />
      </PageContent>
    </PageProvider>
  );
};

export default RegisterPage;
