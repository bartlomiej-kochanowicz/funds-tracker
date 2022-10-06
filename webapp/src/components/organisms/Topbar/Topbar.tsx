import { ReactComponent as LogoNameVerticalDark } from 'assets/logo/logo-name-vertical-dark.svg';
import { StyledRow } from './Topbar.styles';

export const Topbar = () => (
  <StyledRow justifyContent="space-between">
    <LogoNameVerticalDark width="175px" />

    <div>profil</div>
  </StyledRow>
);
