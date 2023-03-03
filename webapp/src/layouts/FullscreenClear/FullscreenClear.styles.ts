import { Column } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const Wrapper = styled(Column)`
  width: 100%;
  height: 100%;
  height: var(--doc-height);

  ${({ theme }) => css`
    padding: ${theme.padding.medium};
    background: ${theme.colors.background};
  `}
`;

export const InnerWrapper = styled(Column)`
  width: 350px;
`;
