import { Loader } from 'components/atoms';
import { Sidebar, BottomBar, Topbar } from 'components/organisms';
import { MobileTopbar } from 'components/organisms/MobileTopbar';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { Fragment, ReactNode, Suspense } from 'react';
import { Content, Center } from './Dashboard.styles';

interface DashboardProps {
  children: ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
  const isDesktop = useBreakpoint('desktop', 'min');

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
          <MobileTopbar />

          <BottomBar />
        </Fragment>
      )}

      <Content>
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
