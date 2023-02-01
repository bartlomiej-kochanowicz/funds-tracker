import { lazy } from 'react';
import { RECAPTCHA_SITE_KEY } from 'config/env';
import { ROUTES } from 'routes/paths';

const GoogleReCaptchaProvider = lazy(() =>
  import('react-google-recaptcha-v3').then(({ GoogleReCaptchaProvider: component }) => ({
    default: component,
  })),
);

const UnprotectedRoute = lazy(() =>
  import('utils/UnprotectedRoute').then(({ UnprotectedRoute: component }) => ({
    default: component,
  })),
);

const Signup = lazy(() =>
  import('./Signup').then(({ Signup: component }) => ({ default: component })),
);

const Confirm = lazy(() =>
  import('./Confirm').then(({ Confirm: component }) => ({ default: component })),
);

export const SignupRoutes = [
  {
    path: ROUTES.SIGNUP.SIGNUP,
    element: (
      <UnprotectedRoute to={ROUTES.DASHBOARD.HOME}>
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
          <Signup />
        </GoogleReCaptchaProvider>
      </UnprotectedRoute>
    ),
  },
  {
    path: ROUTES.SIGNUP.CONFIRM,
    element: (
      <UnprotectedRoute to={ROUTES.DASHBOARD.HOME}>
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
          <Confirm />
        </GoogleReCaptchaProvider>
      </UnprotectedRoute>
    ),
  },
];
