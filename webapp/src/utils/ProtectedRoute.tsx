import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes';
import { isUserLoggedIn } from 'helpers/isUserLoggedIn';

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
  if (reverse) return isUserLoggedIn ? <Navigate to={to} /> : children;

  return isUserLoggedIn ? children : <Navigate to={to} />;
};

ProtectedRoute.displayName = 'ProtectedRoute';

ProtectedRoute.defaultProps = {
  to: ROUTES.SIGNIN,
  reverse: false,
};
