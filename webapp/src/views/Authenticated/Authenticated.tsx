import { ErrorContent } from 'components/molecules';
import { Fragment, lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useRoutes } from 'react-router-dom';
import { Sidebar, MobileNavigation, Topbar, MobileTopbar } from 'components/organisms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { ROUTES } from 'routes/paths';
import { Loader } from 'components/atoms';
import { DashboardRoutes } from './Dashboard';
import { HubRoutes } from './Hub';
import { SettingsRoutes } from './Settings';
import { Center, Content } from './Authenticated.styles';

const ProtectedRoute = lazy(() =>
  import('utils/ProtectedRoute').then(({ ProtectedRoute: component }) => ({ default: component })),
);

export const Authenticated = () => {
  const views = useRoutes([...DashboardRoutes, ...SettingsRoutes, ...HubRoutes]);
  const isDesktop = useBreakpoint('desktop', 'min');

  const location = useLocation();

  const isDashboard = location.pathname.includes(ROUTES.DASHBOARD.HOME);

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
              <MobileTopbar isDashboard={isDashboard} />

              <MobileNavigation />
            </Fragment>
          )}

          <ErrorBoundary FallbackComponent={ErrorContent}>
            <Content isDashboard={isDashboard}>
              <Suspense
                fallback={
                  <Center>
                    <Loader size="large" />
                  </Center>
                }
              >
                {views}
              </Suspense>
            </Content>
          </ErrorBoundary>
        </Fragment>
      </ProtectedRoute>
    );
  }

  return null;
};
