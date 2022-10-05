import { FC, lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { ROUTES } from 'routes';
import { Loading } from 'layouts/Loading';
import { ProtectedRoute } from 'utils/ProtectedRoute';
import { HomeRoutes } from 'views/Home';
import { SinginRoutes } from 'views/Signin';
import { SignupRoutes } from 'views/Signup';
import { IntroductionRoutes } from 'views/Introduction';
import { DashboardRoutes } from 'views/Dashboard';

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
    ...IntroductionRoutes,
    ...DashboardRoutes,
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
