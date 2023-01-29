import { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Loading } from 'layouts/Loading';
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

  return <Suspense fallback={<Loading />}>{Authenticated() || views}</Suspense>;
};
