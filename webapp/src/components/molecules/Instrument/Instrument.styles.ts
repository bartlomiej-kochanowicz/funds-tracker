import styled, { css } from 'styled-components';

export const Wrapper = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) => css`
    padding: ${theme.padding.mediumY};
    border-radius: ${theme.radius.secondary};
  `}
`;
