import styled, { css } from 'styled-components';

export const Cell = styled.div<{ center?: boolean }>`
  ${({ theme }) => css`
    padding: ${theme.padding.small};
  `}
  display:flex;
  align-items: center;
  ${({ center }) => center && 'justify-content: center;'}
`;
