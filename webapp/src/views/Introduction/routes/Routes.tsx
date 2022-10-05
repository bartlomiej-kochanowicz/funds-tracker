import { lazy } from 'react';
import { ROUTES } from 'routes/paths';
import { ProtectedRoute } from 'utils/ProtectedRoute';

const Introduction = lazy(() =>
  import('./Introduction').then(({ Introduction: component }) => ({
    default: component,
  })),
);

export const IntroductionRoutes = [
  {
    path: ROUTES.INTRODUCTION,
    element: (
      <ProtectedRoute>
        <Introduction />
      </ProtectedRoute>
    ),
  },
];
