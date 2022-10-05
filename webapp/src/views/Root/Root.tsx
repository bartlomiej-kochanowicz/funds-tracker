import { FC, lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { ROUTES } from 'routes';
import { Loading } from 'layouts/Loading';
import { ProtectedRoute } from 'utils/ProtectedRoute';
import { HomeRoutes } from 'views/Home';
import { SinginRoutes } from 'views/Signin';
import { SignupRoutes } from 'views/Signup';

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
    ...HomeRoutes,
    ...SinginRoutes,
    ...SignupRoutes,
    {
      path: ROUTES.INTRODUCTION,
      element: (
        <ProtectedRoute>
          <Introduction />
        </ProtectedRoute>
      ),
    },
    {
      path: ROUTES.DASHBOARD.DASHBOARD,
      element: (
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      ),
    },
    {
      path: ROUTES.MODEL_PORTFOLIO,
      element: (
        <ProtectedRoute>
          <ModelPortfolio />
        </ProtectedRoute>
      ),
    },
    {
      path: ROUTES.ACTUAL_PORTFOLIO,
      element: (
        <ProtectedRoute>
          <ActualPortfolio />
        </ProtectedRoute>
      ),
    },
    {
      path: ROUTES.ANY,
      element: <NotFound />,
    },
  ]);

  return <Suspense fallback={<Loading />}>{views}</Suspense>;
};
