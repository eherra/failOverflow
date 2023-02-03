import { ReactNode, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';

interface IAuthorizedRoute {
  redirectPath?: string;
  children?: ReactNode;
}

const AuthorizedRoute = ({ redirectPath = '/landing', children }: IAuthorizedRoute) => {
  const { user } = useContext(UserContext);

  if (!user.auth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default AuthorizedRoute;
