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
      path: ROUTES.ANY,
      element: <NotFound />,
    },
  ]);

  return <Suspense fallback={<Loading />}>{views}</Suspense>;
};
