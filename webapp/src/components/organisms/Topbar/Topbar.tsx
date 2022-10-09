import { ReactComponent as LogoNameVerticalDark } from 'assets/logo/logo-name-vertical-dark.svg';
import { Profile } from './components/Profile';
import { StyledRow } from './Topbar.styles';

export const Topbar = () => (
  <StyledRow justifyContent="space-between">
    <LogoNameVerticalDark width="135px" />

    <Profile />
  </StyledRow>
);
