import { lazy } from 'react';
import { ROUTES } from 'routes';
import { ProtectedRoute } from 'utils/ProtectedRoute';

const Dashboard = lazy(() =>
  import('./Dashboard').then(({ Dashboard: component }) => ({
    default: component,
  })),
);

export const DashboardRoutes = [
  {
    path: ROUTES.DASHBOARD.DASHBOARD,
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
];
