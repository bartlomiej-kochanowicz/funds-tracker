import { Column } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const Content = styled(Column).withConfig({
  shouldForwardProp: prop => !['isDashboard'].includes(prop),
})<{ isDashboard: boolean }>`
  min-height: 100%;
  min-height: var(--doc-height);

  ${({ theme, isDashboard }) => css`
    padding: ${theme.spacing['1']};

    ${theme.breakpoints.desktop.min} {
      margin-left: 230px;
      padding: calc(5 * ${theme.spacing['3.5']});
      padding-top: 95px;
    }

    ${theme.breakpoints.desktop.max} {
      padding-top: ${isDashboard ? '55px' : '95px'};
      padding-bottom: 150px; // some space for the footer
    }
  `}
`;
