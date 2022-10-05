import { lazy } from 'react';
import { ROUTES } from 'routes';
import { ProtectedRoute } from 'utils/ProtectedRoute';

const Home = lazy(() => import('./Home').then(({ Home: component }) => ({ default: component })));

export const HomeRoutes = [
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedRoute
        to={ROUTES.DASHBOARD.HOME}
        reverse
      >
        <Home />
      </ProtectedRoute>
    ),
  },
];
