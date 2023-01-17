import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { useUserContext } from 'contexts/UserContext';
import { Loader } from 'components/atoms';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { IntroductionStep } from '__generated__/graphql';

interface ProtectedRouteProps {
  children: JSX.Element;
  to?: string;
}

export const ProtectedRoute = ({ children, to = ROUTES.SIGNIN }: ProtectedRouteProps) => {
  const { user, loading } = useUserContext();

  const location = useLocation();

  const isAuthenticated = Boolean(!loading && user);

  if (loading) {
    return (
      <FullscreenClear>
        <Loader />
      </FullscreenClear>
    );
  }

  if (
    isAuthenticated &&
    user.introductionStep !== IntroductionStep.Completed &&
    location.pathname !== ROUTES.INTRODUCTION
  ) {
    return <Navigate to={ROUTES.INTRODUCTION} />;
  }

  return isAuthenticated ? children : <Navigate to={to} />;
};

ProtectedRoute.displayName = 'ProtectedRoute';
