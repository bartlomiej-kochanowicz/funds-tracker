import { lazy } from 'react';
import { ROUTES } from 'routes/paths';

const ResetPassword = lazy(() =>
  import('./ResetPassword').then(({ ResetPassword: component }) => ({ default: component })),
);

export const ResetPasswordRoutes = [
  {
    path: ROUTES.RESET_PASSWORD,
    element: <ResetPassword />,
  },
];
