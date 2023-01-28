import PageProvider from "../common/PageProvider";
import { PageContent, PageHeader } from "grommet";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = () => {
  return (
    <PageProvider>
      <PageContent>
      <PageHeader
          title="Register to Failover Flow"
        />
        <RegisterForm />
      </PageContent>
    </PageProvider>
  )
};

export default RegisterPage;