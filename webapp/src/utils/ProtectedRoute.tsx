import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { useUserContext } from 'contexts/UserContext';
import { Loader } from 'components/atoms';

interface ProtectedRouteProps {
  children: JSX.Element;
  to?: string;
}

export const ProtectedRoute = ({ children, to = ROUTES.SIGNIN }: ProtectedRouteProps) => {
  const { user, loading } = useUserContext();

  const isAuthenticated = !loading && user;

  if (loading || !user) {
    return <Loader />;
  }

  return isAuthenticated ? children : <Navigate to={to} />;
};

ProtectedRoute.displayName = 'ProtectedRoute';
