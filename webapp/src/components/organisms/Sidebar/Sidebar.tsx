import { Heading, Spacer } from 'components/atoms';
import { dashboardNavigation } from 'routes/navigation';
import { NavList } from './components/NavList';
import { StyledColumn } from './Sidebar.styles';

export const Sidebar = () => (
  <StyledColumn>
    <Heading
      level="h2"
      fontColor="black"
      fontSize="1.25"
    >
      DASHBOARD
    </Heading>

    <Spacer space="small" />

    <NavList routes={dashboardNavigation} />
  </StyledColumn>
);
