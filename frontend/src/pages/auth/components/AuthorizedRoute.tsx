import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from 'grommet';
import { useUserContext } from '../../../context/UserContext';

interface IAuthorizedRoute {
  redirectPath?: string;
  children?: ReactNode;
}

const AuthorizedRoute = ({ redirectPath = '/landing', children }: IAuthorizedRoute) => {
  const { user, isUserContextLoading } = useUserContext();

  if (isUserContextLoading) {
    return <Spinner size='large' />;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default AuthorizedRoute;
