import { Navigate } from 'react-router-dom';

import { getAuthorizationStatus } from '@src/store/user-process/selectors';
import { useAppSelector } from '@src/hooks';

import Loader from '@components/loader/loader';

import { type AppRoute,AuthorizationStatus } from '@src/const';

type PrivateRouteProps = {
  restrictedFor: AuthorizationStatus;
  redirectTo: AppRoute;
  children: React.JSX.Element;
}

const PrivateRoute = ({ children, restrictedFor, redirectTo }: PrivateRouteProps) => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <Loader />;
  }

  return (
    authorizationStatus !== restrictedFor
      ? children
      : <Navigate to={redirectTo} />
  );
};

export default PrivateRoute;
