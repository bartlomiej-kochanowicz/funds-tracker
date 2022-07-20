import { FC, lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { ROUTES } from 'ROUTES';
import { Loading } from 'layouts/Loading';

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
    { path: ROUTES.HOME, element: <Home /> },
    { path: ROUTES.SIGNIN, element: <Signin /> },
    { path: ROUTES.INTRODUCTION, element: <Introduction /> },
    { path: ROUTES.DASHBOARD, element: <Dashboard /> },
    { path: ROUTES.DASHBOARD, element: <ModelPortfolio /> },
    { path: ROUTES.DASHBOARD, element: <ActualPortfolio /> },
    { path: ROUTES.ANY, element: <NotFound /> },
  ]);

  return <Suspense fallback={<Loading />}>{views}</Suspense>;
};
