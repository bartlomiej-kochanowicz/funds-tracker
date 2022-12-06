import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { useUserContext } from 'contexts/UserContext';
import { Loader } from 'components/atoms';

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
  const { user, loading } = useUserContext({ isProtected: true });

  const isAuthenticated = loading && user;

  if (loading) {
    return <Loader />;
  }

  if (reverse) return isAuthenticated ? <Navigate to={to} /> : children;

  return isAuthenticated ? children : <Navigate to={to} />;
};

ProtectedRoute.displayName = 'ProtectedRoute';

ProtectedRoute.defaultProps = {
  to: ROUTES.SIGNIN,
  reverse: false,
};
