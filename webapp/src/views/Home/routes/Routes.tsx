import { lazy } from 'react';
import { ROUTES } from 'routes/paths';

const ProtectedRoute = lazy(() =>
  import('utils/ProtectedRoute').then(({ ProtectedRoute: component }) => ({ default: component })),
);

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
