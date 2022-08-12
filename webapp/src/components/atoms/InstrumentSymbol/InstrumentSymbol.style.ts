import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => css`
    background-color: ${theme.colors.blue};
    border-radius: ${theme.radius.tertiary};
  `}
`;
