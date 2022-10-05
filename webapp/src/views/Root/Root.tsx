import { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Loading } from 'layouts/Loading';
import { HomeRoutes } from 'views/Home';
import { SinginRoutes } from 'views/Signin';
import { SignupRoutes } from 'views/Signup';
import { IntroductionRoutes } from 'views/Introduction';
import { DashboardRoutes } from 'views/Dashboard';
import { NotFoundRoutes } from 'views/NotFound';

export const Root: FC = () => {
  const views = useRoutes([
    ...HomeRoutes,
    ...SinginRoutes,
    ...SignupRoutes,
    ...IntroductionRoutes,
    ...DashboardRoutes,
    ...NotFoundRoutes,
  ]);

  return <Suspense fallback={<Loading />}>{views}</Suspense>;
};
