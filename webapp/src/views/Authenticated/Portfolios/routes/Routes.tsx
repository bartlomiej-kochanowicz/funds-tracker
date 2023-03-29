import { lazy } from 'react';
import { ROUTES } from 'routes/paths';

const Portfolios = lazy(() =>
  import('./Portfolios').then(({ Portfolios: component }) => ({
    default: component,
  })),
);

export const PortfoliosRoutes = [
  {
    path: ROUTES.PORTFOLIOS,
    element: <Portfolios />,
  },
];
