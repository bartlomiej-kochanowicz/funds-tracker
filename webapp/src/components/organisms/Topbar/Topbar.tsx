import { Profile } from 'components/molecules';
import { StyledRow } from './Topbar.styles';

export const Topbar = () => (
  <StyledRow justifyContent="flex-end">
    <Profile withName />
  </StyledRow>
);
