import { FC, lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { paths } from 'routes/paths';
import { Loading } from 'layouts/Loading';

const Home = lazy(() => import('views/Home').then(({ Home: HomeView }) => ({ default: HomeView })));

const Login = lazy(() =>
  import('views/Login').then(({ Login: LoginView }) => ({ default: LoginView })),
);

const NotFound = lazy(() =>
  import('views/NotFound').then(({ NotFound: NotFoundView }) => ({ default: NotFoundView })),
);

export const Root: FC = () => {
  const routes = useRoutes([
    { path: paths.home, element: <Home /> },
    { path: paths.login, element: <Login /> },
    { path: paths.any, element: <NotFound /> },
  ]);

  return <Suspense fallback={<Loading />}>{routes}</Suspense>;
};
