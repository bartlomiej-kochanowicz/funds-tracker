import { FC, lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { paths } from 'routes/paths';
import { Loading } from 'layouts/Loading';

const Home = lazy(() =>
  import('views/Home').then(({ Home: component }) => ({ default: component })),
);

const Login = lazy(() =>
  import('views/Login').then(({ Login: component }) => ({ default: component })),
);

const AddModelPortfolio = lazy(() =>
  import('views/AddModelPortfolio').then(({ AddModelPortfolio: component }) => ({
    default: component,
  })),
);

const NotFound = lazy(() =>
  import('views/NotFound').then(({ NotFound: component }) => ({ default: component })),
);

export const Root: FC = () => {
  const routes = useRoutes([
    { path: paths.home, element: <Home /> },
    { path: paths.login, element: <Login /> },
    { path: paths.addModelPortfolio, element: <AddModelPortfolio /> },
    { path: paths.any, element: <NotFound /> },
  ]);

  return <Suspense fallback={<Loading />}>{routes}</Suspense>;
};
