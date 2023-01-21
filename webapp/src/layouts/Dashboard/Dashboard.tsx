import { Sidebar, BottomBar, Topbar } from 'components/organisms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { Loading } from 'layouts/Loading';
import { Fragment, ReactNode, Suspense } from 'react';
import { Content } from './Dashboard.styles';

interface DashboardProps {
  children: ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
  const isDesktop = useBreakpoint('desktop', 'min');

  return (
    <Fragment>
      {isDesktop && <Topbar />}

      {isDesktop && <Sidebar />}

      {!isDesktop && <BottomBar />}

      <Content>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </Content>
    </Fragment>
  );
};
