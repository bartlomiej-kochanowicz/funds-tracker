import { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { FullscreenLoading } from 'layouts/FullscreenLoading';
import { HomeRoutes } from 'views/Home';
import { SinginRoutes } from 'views/Signin';
import { SignupRoutes } from 'views/Signup';
import { IntroductionRoutes } from 'views/Introduction';
import { NotFoundRoutes } from 'views/NotFound';
import { Authenticated } from 'views/Authenticated';

export const Root: FC = () => {
  const views = useRoutes([
    ...HomeRoutes,
    ...SinginRoutes,
    ...SignupRoutes,
    ...IntroductionRoutes,
    ...NotFoundRoutes,
  ]);

  return <Suspense fallback={<FullscreenLoading />}>{Authenticated() || views}</Suspense>;
};
