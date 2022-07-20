import { FC, lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { ROUTES } from 'ROUTES';
import { Loading } from 'layouts/Loading';

const Home = lazy(() =>
  import('views/Home').then(({ Home: component }) => ({ default: component })),
);

const Login = lazy(() =>
  import('views/Login').then(({ Login: component }) => ({ default: component })),
);

const Introduction = lazy(() =>
  import('views/Introduction').then(({ Introduction: component }) => ({
    default: component,
  })),
);

const NotFound = lazy(() =>
  import('views/NotFound').then(({ NotFound: component }) => ({ default: component })),
);

export const Root: FC = () => {
  const views = useRoutes([
    { path: ROUTES.HOME, element: <Home /> },
    { path: ROUTES.SIGNIN, element: <Login /> },
    { path: ROUTES.INTRODUCTION, element: <Introduction /> },
    { path: ROUTES.ANY, element: <NotFound /> },
  ]);

  return <Suspense fallback={<Loading />}>{views}</Suspense>;
};
