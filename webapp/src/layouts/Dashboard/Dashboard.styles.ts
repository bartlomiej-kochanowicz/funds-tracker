import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  height: var(--doc-height);
  margin-left: 270px;

  ${({ theme }) => css`
    background-color: ${theme.colors.lightGray};
    padding: ${theme.spacing.huge};
  `}
`;
