import { Column } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const StyledColumn = styled(Column)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  height: var(--doc-height);

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
    z-index: ${theme.zIndex.sidebar};
    padding: calc(${theme.spacing.huge} * 2.5) 0 ${theme.spacing.huge} ${theme.spacing.huge};
    box-shadow: ${theme.shadows.box};
  `}
`;
