import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100%;
  min-height: var(--doc-height);

  ${({ theme }) => css`
    background-color: ${theme.colors.gray100};
    padding: ${theme.spacing.large};

    ${theme.breakpoints.desktop.min} {
      margin-left: 270px;
      padding: ${theme.spacing.huge};
      padding-top: 98px;
    }

    ${theme.breakpoints.desktop.max} {
      padding-bottom: 150px;
    }
  `}
`;
