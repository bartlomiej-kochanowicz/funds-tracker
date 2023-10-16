import styled, { css } from 'styled-components';

export const Trigger = styled.button`
  border: none;
  background: none;
  cursor: pointer;

  ${({ theme }) => css`
    &:focus-visible {
      outline: 2px solid ${theme.colors.blue};
    }
  `}
`;
