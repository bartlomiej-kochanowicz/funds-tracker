import { lazy } from 'react';
import { ROUTES } from 'routes/paths';
import { ProtectedRoute } from 'utils/ProtectedRoute';

const Signin = lazy(() =>
  import('./Signin').then(({ Signin: component }) => ({ default: component })),
);

export const SinginRoutes = [
  {
    path: ROUTES.SIGNIN,
    element: (
      <ProtectedRoute
        to={ROUTES.DASHBOARD.HOME}
        reverse
      >
        <Signin />
      </ProtectedRoute>
    ),
  },
];
