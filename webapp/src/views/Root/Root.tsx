import { FC, lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ROUTES } from 'routes';
import { Loading } from 'layouts/Loading';
import { ErrorContent } from 'components/molecules/ErrorContent';

const Home = lazy(() =>
  import('views/Home').then(({ Home: component }) => ({ default: component })),
);

const Signin = lazy(() =>
  import('views/Signin').then(({ Signin: component }) => ({ default: component })),
);

const Introduction = lazy(() =>
  import('views/Introduction').then(({ Introduction: component }) => ({
    default: component,
  })),
);

const Dashboard = lazy(() =>
  import('views/Dashboard').then(({ Dashboard: component }) => ({
    default: component,
  })),
);

const ModelPortfolio = lazy(() =>
  import('views/ModelPortfolio').then(({ ModelPortfolio: component }) => ({
    default: component,
  })),
);

const ActualPortfolio = lazy(() =>
  import('views/ActualPortfolio').then(({ ActualPortfolio: component }) => ({
    default: component,
  })),
);

const NotFound = lazy(() =>
  import('views/NotFound').then(({ NotFound: component }) => ({ default: component })),
);

export const Root: FC = () => {
  const views = useRoutes([
    {
      path: ROUTES.HOME,
      element: (
        <ErrorBoundary FallbackComponent={ErrorContent}>
          <Home />
        </ErrorBoundary>
      ),
    },
    {
      path: ROUTES.SIGNIN,
      element: (
        <ErrorBoundary FallbackComponent={ErrorContent}>
          <Signin />
        </ErrorBoundary>
      ),
    },
    {
      path: ROUTES.INTRODUCTION,
      element: (
        <ErrorBoundary FallbackComponent={ErrorContent}>
          <Introduction />
        </ErrorBoundary>
      ),
    },
    {
      path: ROUTES.DASHBOARD,
      element: (
        <ErrorBoundary FallbackComponent={ErrorContent}>
          <Dashboard />
        </ErrorBoundary>
      ),
    },
    {
      path: ROUTES.MODEL_PORTFOLIO,
      element: (
        <ErrorBoundary FallbackComponent={ErrorContent}>
          <ModelPortfolio />
        </ErrorBoundary>
      ),
    },
    {
      path: ROUTES.ACTUAL_PORTFOLIO,
      element: (
        <ErrorBoundary FallbackComponent={ErrorContent}>
          <ActualPortfolio />
        </ErrorBoundary>
      ),
    },
    {
      path: ROUTES.ANY,
      element: (
        <ErrorBoundary FallbackComponent={ErrorContent}>
          <NotFound />
        </ErrorBoundary>
      ),
    },
  ]);

  return <Suspense fallback={<Loading />}>{views}</Suspense>;
};
