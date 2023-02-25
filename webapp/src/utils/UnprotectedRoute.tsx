import { useUserContext } from 'contexts/UserContext';
import { FullscreenLoading } from 'layouts/FullscreenLoading';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';

interface UnprotectedRouteProps {
  children: JSX.Element;
  to?: string;
}

export const UnprotectedRoute = ({ children, to = ROUTES.SIGNIN }: UnprotectedRouteProps) => {
  const { user, loading } = useUserContext();

  const isAuthenticated = !loading && user;

  if (loading) {
    return <FullscreenLoading />;
  }

  return isAuthenticated ? <Navigate to={to} /> : children;
};

UnprotectedRoute.displayName = 'UnprotectedRoute';
