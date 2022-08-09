import styled, { css } from 'styled-components';

export const Wrapper = styled.li`
  min-height: 60px;
  margin-bottom: 10px;

  ${({ theme }) =>
    css`
      padding: ${theme.padding.medium};
      background-color: ${theme.colors.white};
      border-radius: ${theme.radius.secondary};
    `}
`;
