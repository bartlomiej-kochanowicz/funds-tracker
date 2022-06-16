import { FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Home } from 'views/Home';
import { NotFound } from 'views/NotFound';
import { paths } from 'routes/paths';

export const Root: FC = () => {
  const routes = useRoutes([
    { path: paths.home, element: <Home /> },
    { path: paths.any, element: <Navigate to={paths.notFound} /> },
    { path: paths.notFound, element: <NotFound /> },
  ]);

  return routes;
};
