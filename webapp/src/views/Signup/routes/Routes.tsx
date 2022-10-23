import { lazy } from 'react';
import { ROUTES } from 'routes/paths';

const ProtectedRoute = lazy(() =>
  import('utils/ProtectedRoute').then(({ ProtectedRoute: component }) => ({ default: component })),
);

const Signup = lazy(() =>
  import('./Signup').then(({ Signup: component }) => ({ default: component })),
);

export const SignupRoutes = [
  {
    path: ROUTES.SIGNUP,
    element: (
      <ProtectedRoute
        to={ROUTES.DASHBOARD.HOME}
        reverse
      >
        <Signup />
      </ProtectedRoute>
    ),
  },
];
