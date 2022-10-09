import styled, { css } from 'styled-components';

export const Trigger = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  ${({ theme }) => css`
    outline-color: ${theme.colors.blue};
  `}
`;
