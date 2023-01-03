import { lazy } from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ROUTES } from 'routes/paths';
import { ErrorContent } from 'components/molecules';

const ProtectedRoute = lazy(() =>
  import('utils/ProtectedRoute').then(({ ProtectedRoute: component }) => ({ default: component })),
);

const DashboardLayout = lazy(() =>
  import('layouts/Dashboard').then(({ Dashboard: component }) => ({
    default: component,
  })),
);

const Dashboard = lazy(() =>
  import('./Dashboard').then(({ Dashboard: component }) => ({
    default: component,
  })),
);

const Hub = lazy(() =>
  import('./Hub').then(({ Hub: component }) => ({
    default: component,
  })),
);

const CashAccounts = lazy(() =>
  import('./CashAccounts').then(({ CashAccounts: component }) => ({
    default: component,
  })),
);

export const DashboardRoutes = [
  {
    path: ROUTES.DASHBOARD.HOME,
    element: (
      <ProtectedRoute>
        <DashboardLayout>
          <ErrorBoundary FallbackComponent={ErrorContent}>
            <Outlet />
          </ErrorBoundary>
        </DashboardLayout>
      </ProtectedRoute>
    ),
    children: [
      { path: ROUTES.DASHBOARD.HOME, element: <Dashboard /> },
      { path: ROUTES.DASHBOARD.HUB, element: <Hub /> },
      { path: ROUTES.DASHBOARD.PORTFOLIO, element: <div>portfolio</div> },
      { path: ROUTES.DASHBOARD.CASH_ACCOUNTS, element: <CashAccounts /> },
      { path: ROUTES.DASHBOARD.TRANSACTIONS, element: <div>transactions</div> },
      { path: ROUTES.DASHBOARD.HISTORY, element: <div>history</div> },
    ],
  },
];
