import styled, { css } from 'styled-components';

export const BackWrapper = styled.div`
  position: absolute;

  ${({ theme }) => css`
    top: ${theme.spacing['1']};
    left: ${theme.spacing['1']};
  `}
`;
