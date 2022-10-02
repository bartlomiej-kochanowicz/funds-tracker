import styled, { css } from 'styled-components';

export const BackWrapper = styled.div`
  position: absolute;

  ${({ theme }) => css`
    top: ${theme.spacing.medium};
    left: ${theme.spacing.medium};
  `}
`;
