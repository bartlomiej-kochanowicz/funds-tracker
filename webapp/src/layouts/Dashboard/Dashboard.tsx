import { Sidebar, BottomBar, Topbar } from 'components/organisms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { Loading } from 'layouts/Loading';
import { ReactNode, Suspense } from 'react';
import { Wrapper } from './Dashboard.styles';

interface DashboardProps {
  children: ReactNode;
}

export const Dashboard = ({ children }: DashboardProps) => {
  const isDesktop = useBreakpoint('desktop', 'min');

  return (
    <Wrapper>
      {isDesktop && <Topbar />}

      {isDesktop && <Sidebar />}

      {!isDesktop && <BottomBar />}

      <Suspense fallback={<Loading />}>{children}</Suspense>
    </Wrapper>
  );
};
