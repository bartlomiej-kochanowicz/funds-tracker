import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { ROUTES } from 'routes/paths';

const Dashboard = lazy(() =>
  import('./Dashboard').then(({ Dashboard: component }) => ({
    default: component,
  })),
);

const CashAccounts = lazy(() =>
  import('./CashAccounts').then(({ CashAccounts: component }) => ({
    default: component,
  })),
);

const CashAccount = lazy(() =>
  import('./CashAccount').then(({ CashAccount: component }) => ({
    default: component,
  })),
);

export const DashboardRoutes = [
  {
    path: ROUTES.DASHBOARD.HOME,
    element: <Outlet />,
    children: [
      { path: ROUTES.DASHBOARD.HOME, element: <Dashboard /> },
      { path: ROUTES.DASHBOARD.PORTFOLIO, element: <div>portfolio</div> },
      { path: ROUTES.DASHBOARD.CASH_ACCOUNTS, element: <CashAccounts /> },
      { path: ROUTES.DASHBOARD.CASH_ACCOUNT, element: <CashAccount /> },
      { path: ROUTES.DASHBOARD.TRANSACTIONS, element: <div>transactions</div> },
      { path: ROUTES.DASHBOARD.HISTORY, element: <div>history</div> },
    ],
  },
];
