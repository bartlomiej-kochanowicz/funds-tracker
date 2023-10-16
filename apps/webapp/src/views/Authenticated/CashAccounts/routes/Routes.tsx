import { lazy } from 'react';
import { ROUTES } from 'routes/paths';

const CashAccounts = lazy(() =>
  import('./CashAccounts').then(({ CashAccounts: component }) => ({
    default: component,
  })),
);

export const CashAccountsRoutes = [
  {
    path: ROUTES.CASH_ACCOUNTS,
    element: <CashAccounts />,
  },
];
