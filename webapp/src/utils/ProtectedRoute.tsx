import { getAccessToken } from 'helpers/accessTokens';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes';

interface ProtectedRouteProps {
  children: JSX.Element;
  to?: string;
  reverse?: boolean;
}

export const ProtectedRoute = ({
  children,
  to = ROUTES.SIGNIN,
  reverse = false,
}: ProtectedRouteProps) => {
  const accessToken = getAccessToken();

  if (reverse) return accessToken ? <Navigate to={to} /> : children;

  return accessToken ? children : <Navigate to={to} />;
};

ProtectedRoute.displayName = 'ProtectedRoute';

ProtectedRoute.defaultProps = {
  to: ROUTES.SIGNIN,
  reverse: false,
};
