import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from 'routes';
import { selectAuth } from 'store/selectors/auth';

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
  const { data, status } = useSelector(selectAuth);

  const isAuth = data.uuid && status === 'fulfilled';

  if (reverse) return isAuth ? <Navigate to={to} /> : children;

  return isAuth ? children : <Navigate to={to} />;
};

ProtectedRoute.displayName = 'ProtectedRoute';

ProtectedRoute.defaultProps = {
  to: ROUTES.SIGNIN,
  reverse: false,
};
