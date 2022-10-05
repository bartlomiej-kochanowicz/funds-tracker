import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { useSelector } from 'react-redux';
import { selectAccount } from 'store/selectors/account';
import { useStatus } from 'hooks/useStatus';

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
  const { status } = useSelector(selectAccount);

  const { loaded, rejected } = useStatus(status);

  const isAuthenticated = loaded && !rejected;

  if (reverse) return isAuthenticated ? <Navigate to={to} /> : children;

  return isAuthenticated ? children : <Navigate to={to} />;
};

ProtectedRoute.displayName = 'ProtectedRoute';

ProtectedRoute.defaultProps = {
  to: ROUTES.SIGNIN,
  reverse: false,
};
