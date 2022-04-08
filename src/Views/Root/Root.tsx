import { FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { NotFound } from 'Views/NotFound';
import { Welcome } from 'Views/Welcome';
import { Dashboard } from 'Views/Dashboard';
import { paths } from 'Routes/paths';

export const Root: FC = () => {
  const routes = useRoutes([
    { path: '*', element: <Navigate to="/404" /> },
    { path: paths.notFound, element: <NotFound /> },
    { path: paths.welcome, element: <Welcome /> },
    { path: paths.dashboard, element: <Dashboard /> },
  ]);

  return routes;
};
