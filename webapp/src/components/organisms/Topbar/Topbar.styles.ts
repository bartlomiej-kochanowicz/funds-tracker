import { Row } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const StyledRow = styled(Row)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${({ theme }) => css`
    z-index: ${theme.zIndex.topbar};
    padding: ${theme.padding.huge};
    background-color: ${theme.colors.gray100};
  `}
`;
