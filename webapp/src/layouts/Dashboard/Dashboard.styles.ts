import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  height: var(--doc-height);

  ${({ theme }) => css`
    background-color: ${theme.colors.lightGray};
    padding: ${theme.spacing.large};

    ${theme.breakpoints.desktop} {
      margin-left: 270px;
      padding: ${theme.spacing.huge};
    }
  `}
`;
