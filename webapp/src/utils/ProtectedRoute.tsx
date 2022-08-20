import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes';
import { selectSigninData } from 'store/selectors/auth';

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { accessToken } = useSelector(selectSigninData);

  return accessToken ? children : <Navigate to={ROUTES.SIGNIN} />;
};
