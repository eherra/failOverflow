import LoginForm from "./components/LoginForm";
import PageProvider from "../common/PageProvider";
import { PageContent, PageHeader } from "grommet";

const LoginPage = () => {
  return (
    <PageProvider>
      <PageContent>
      <PageHeader
          title="Login to Failoverflow"
        />
        <LoginForm />
      </PageContent>
    </PageProvider>
  )
};

export default LoginPage;