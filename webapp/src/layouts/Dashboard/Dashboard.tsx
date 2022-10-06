import { Sidebar, BottomBar, Topbar } from 'components/organisms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { ReactNode } from 'react';
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

      {children}
    </Wrapper>
  );
};
