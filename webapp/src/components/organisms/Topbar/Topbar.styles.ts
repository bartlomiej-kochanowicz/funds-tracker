import { Row } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const StyledRow = styled(Row).withConfig({
  shouldForwardProp: prop => !['hasBorder'].includes(prop),
})<{ hasBorder: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${({ theme, hasBorder }) => css`
    z-index: ${theme.zIndex.topbar};
    padding: ${theme.spacing.large} ${theme.spacing.huge};
    background-color: ${theme.colors.gray100};

    ${hasBorder &&
    css`
      border-bottom: 1px solid ${theme.colors.gray200};
    `}
  `}
`;
