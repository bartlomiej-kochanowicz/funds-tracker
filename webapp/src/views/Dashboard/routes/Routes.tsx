import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { ProtectedRoute } from 'utils/ProtectedRoute';

const Home = lazy(() =>
  import('./Home').then(({ Home: component }) => ({
    default: component,
  })),
);

export const DashboardRoutes = [
  {
    path: ROUTES.DASHBOARD.DASHBOARD,
    element: (
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [{ path: ROUTES.DASHBOARD.HOME, element: <Home /> }],
  },
];
