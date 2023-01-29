import { Loader } from 'components/atoms';
import { Sidebar, MobileNavigation, Topbar } from 'components/organisms';
import { MobileTopbar } from 'components/organisms/MobileTopbar';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { Fragment, ReactNode, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { Content, Center } from './Dashboard.styles';

interface DashboardProps {
  children: ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
  const isDesktop = useBreakpoint('desktop', 'min');

  const location = useLocation();

  const isHub = location.pathname === ROUTES.DASHBOARD.HUB;

  return (
    <Fragment>
      {isDesktop && (
        <Fragment>
          <Topbar />

          <Sidebar />
        </Fragment>
      )}

      {!isDesktop && (
        <Fragment>
          <MobileTopbar isHub={isHub} />

          <MobileNavigation />
        </Fragment>
      )}

      <Content isHub={isHub}>
        <Suspense
          fallback={
            <Center>
              <Loader size="large" />
            </Center>
          }
        >
          {children}
        </Suspense>
      </Content>
    </Fragment>
  );
};
