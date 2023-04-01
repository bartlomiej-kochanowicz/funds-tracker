import { Loader } from 'components/atoms';
import { lazy, Suspense } from 'react';
import { ROUTES } from 'routes/paths';

const Portfolios = lazy(() =>
  import('./Portfolios').then(({ Portfolios: component }) => ({
    default: component,
  })),
);

const Portfolio = lazy(() =>
  import('./Portfolio').then(({ Portfolio: component }) => ({
    default: component,
  })),
);

export const PortfoliosRoutes = [
  {
    path: ROUTES.PORTFOLIOS.PORTFOLIOS,
    element: (
      <Suspense fallback={<Loader />}>
        <Portfolios />
      </Suspense>
    ),
  },
  {
    path: ROUTES.PORTFOLIOS.PORTFOLIO,
    element: (
      <Suspense fallback={<Loader />}>
        <Portfolio />
      </Suspense>
    ),
  },
];
