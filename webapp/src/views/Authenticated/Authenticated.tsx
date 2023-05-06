import { ErrorContent } from 'components/molecules';
import { MobileNavigation, MobileTopbar, Sidebar, Topbar } from 'components/organisms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { FullscreenLoading } from 'layouts/FullscreenLoading';
import { Fragment, lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useRoutes } from 'react-router-dom';
import { ROUTES } from 'routes/paths';

import { Main } from './Authenticated.styles';
import { CashAccountsRoutes } from './CashAccounts';
import { DashboardRoutes } from './Dashboard/routes/Routes';
import { HubRoutes } from './Hub';
import { PortfoliosRoutes } from './Portfolios';
import { SettingsRoutes } from './Settings';

const ProtectedRoute = lazy(() =>
  import('utils/ProtectedRoute').then(({ ProtectedRoute: component }) => ({ default: component })),
);

export const Authenticated = () => {
  const views = useRoutes([
    ...DashboardRoutes,
    ...PortfoliosRoutes,
    ...CashAccountsRoutes,
    ...SettingsRoutes,
    ...HubRoutes,
  ]);
  const isDesktop = useBreakpoint('desktop', 'min');

  const location = useLocation();

  const isHub = location.pathname === ROUTES.HUB;

  if (views) {
    return (
      <ProtectedRoute>
        <Fragment>
          {isDesktop && (
            <Fragment>
              <Topbar />

              <Sidebar />
            </Fragment>
          )}

          {!isDesktop && (
            <Fragment>
              <MobileTopbar isDashboard={!isHub} />

              <MobileNavigation />
            </Fragment>
          )}

          <Suspense fallback={<FullscreenLoading />}>
            <Main isDashboard={!isHub}>
              <ErrorBoundary FallbackComponent={ErrorContent}>{views}</ErrorBoundary>
            </Main>
          </Suspense>
        </Fragment>
      </ProtectedRoute>
    );
  }

  return null;
};
