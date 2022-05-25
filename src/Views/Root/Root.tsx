import { FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { NotFound } from 'views/NotFound';
import { Welcome } from 'views/Welcome';
import { Dashboard } from 'views/Dashboard';
import { paths } from 'routes/paths';

export const Root: FC = () => {
  const routes = useRoutes([
    { path: '*', element: <Navigate to={paths.notFound} /> },
    { path: paths.notFound, element: <NotFound /> },
    { path: paths.welcome, element: <Welcome /> },
    { path: paths.dashboard, element: <Dashboard /> },
  ]);

  return routes;
};
