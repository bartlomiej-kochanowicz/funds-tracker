import { Link } from 'react-router-dom';
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
    padding: calc(${theme.spacing['1.5']} - ${theme.spacing['1']} / 2) ${theme.spacing['3.5']};
    background-color: ${theme.colors.background};

    ${hasBorder &&
    css`
      border-bottom: 1px solid ${theme.colors.gray200};
    `}
  `}
`;

export const BackButton = styled(Link)`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${theme.font.size[1]};
    font-weight: ${theme.font.weight[700]};
    text-decoration: none;
    display: flex;
    align-items: center;
  `}
`;
