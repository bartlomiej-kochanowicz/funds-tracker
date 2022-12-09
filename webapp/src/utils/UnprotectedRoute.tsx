import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { useUserContext } from 'contexts/UserContext';

interface UnprotectedRouteProps {
  children: JSX.Element;
  to?: string;
}

export const UnprotectedRoute = ({ children, to = ROUTES.SIGNIN }: UnprotectedRouteProps) => {
  const { user, loading } = useUserContext();

  const isAuthenticated = !loading && user;

  return isAuthenticated ? <Navigate to={to} /> : children;
};

UnprotectedRoute.displayName = 'UnprotectedRoute';
