import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

interface IAuthorizedRoute {
  redirectPath?: string;
  children?: ReactNode;
}

const AuthorizedRoute = ({ redirectPath = '/landing', children }: IAuthorizedRoute) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default AuthorizedRoute;
