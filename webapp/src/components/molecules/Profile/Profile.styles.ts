import { Dropdown } from 'components/atoms';
import styled, { css } from 'styled-components';

export const StyledDropdown = styled(Dropdown)`
  ${({ theme }) => css`
    box-shadow: ${theme.shadows.box};
    padding: 0;
    border-radius: 50%;
  `}
`;
