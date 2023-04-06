import { Row } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const StyledRow = styled(Row).withConfig({
  shouldForwardProp: prop => !['hasBorder', 'leftPadding'].includes(prop),
})<{ hasBorder: boolean; leftPadding: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${({ theme, hasBorder, leftPadding }) => css`
    z-index: ${theme.zIndex.topbar};
    padding: calc(${theme.spacing['1.5']} - ${theme.spacing['1']} / 2) ${theme.spacing['3.5']};
    background-color: ${theme.colors.background};

    ${hasBorder &&
    css`
      border-bottom: 1px solid ${theme.colors.gray200};
    `}

    ${leftPadding &&
    css`
      padding: calc(${theme.spacing['1.5']} - ${theme.spacing['1']} / 2) ${theme.spacing['3.5']}
        calc(${theme.spacing['1.5']} - ${theme.spacing['1']} / 2) 230px;
    `}
  `}
`;

export const BackButton = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.text};
    font-size: ${theme.font.size[1]};
    font-weight: ${theme.font.weight[700]};
    background-color: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0;
  `}
`;
