import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { Dashboard } from 'layouts/Dashboard';
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
        <Dashboard>
          <Outlet />
        </Dashboard>
      </ProtectedRoute>
    ),
    children: [{ path: ROUTES.DASHBOARD.HOME, element: <Home /> }],
  },
];
