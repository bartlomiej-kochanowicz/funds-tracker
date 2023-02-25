import { FullscreenLoading } from 'layouts/FullscreenLoading';
import { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Authenticated } from 'views/Authenticated';
import { HomeRoutes } from 'views/Home';
import { IntroductionRoutes } from 'views/Introduction';
import { NotFoundRoutes } from 'views/NotFound';
import { ResetPasswordRoutes } from 'views/ResetPassword';
import { SinginRoutes } from 'views/Signin';
import { SignupRoutes } from 'views/Signup';

export const Root: FC = () => {
  const views = useRoutes([
    ...HomeRoutes,
    ...SinginRoutes,
    ...SignupRoutes,
    ...IntroductionRoutes,
    ...ResetPasswordRoutes,
    ...NotFoundRoutes,
  ]);

  return <Suspense fallback={<FullscreenLoading />}>{Authenticated() || views}</Suspense>;
};
