import { lazy } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { RECAPTCHA_SITE_KEY } from 'config/env';
import { ROUTES } from 'routes/paths';

const ProtectedRoute = lazy(() =>
  import('utils/ProtectedRoute').then(({ ProtectedRoute: component }) => ({ default: component })),
);

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
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
          <Signin />
        </GoogleReCaptchaProvider>
      </ProtectedRoute>
    ),
  },
];
