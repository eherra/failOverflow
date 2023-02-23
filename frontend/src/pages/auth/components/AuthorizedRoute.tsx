import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../../../context/UserContext';
import CenteredLoadingSpinner from '../../common/CenteredLoadingSpinner';

interface IAuthorizedRoute {
  redirectPath?: string;
  children?: ReactNode;
}

const AuthorizedRoute = ({ redirectPath = '/landing', children }: IAuthorizedRoute) => {
  const { user, isUserContextLoading } = useUserContext();

  if (isUserContextLoading) {
    return <CenteredLoadingSpinner />;
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default AuthorizedRoute;
