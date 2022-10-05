import { lazy } from 'react';
import { ROUTES } from 'routes';
import { ProtectedRoute } from 'utils/ProtectedRoute';

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
