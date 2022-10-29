import { lazy } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RECAPTCHA_SITE_KEY } from 'config/env';
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
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
          <Signup />
        </GoogleReCaptchaProvider>
      </ProtectedRoute>
    ),
  },
];
