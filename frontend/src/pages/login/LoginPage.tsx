import LoginForm from "./components/LoginForm";
import PageProvider from "../common/PageProvider";

const LoginPage = () => {
  return (
    <PageProvider>
      <LoginForm />
    </PageProvider>
  )
};

export default LoginPage;