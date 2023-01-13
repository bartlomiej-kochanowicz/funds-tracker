import styled, { css } from 'styled-components';

export const Bar = styled.span`
  border-bottom-left-radius: 9999px;
  border-top-left-radius: 9999px;

  ${({ theme }) => css`
    width: ${theme.spacing.tiny};
    height: calc(${theme.spacing.medium} + ${theme.spacing.tiny});
    background-color: ${theme.colors.blue};
  `}
`;
