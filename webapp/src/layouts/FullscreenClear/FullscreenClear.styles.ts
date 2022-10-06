import styled, { css } from 'styled-components';
import { Column } from 'simple-flexbox';

export const Wrapper = styled(Column)`
  width: 100%;
  height: 100%;
  height: var(--doc-height);

  ${({ theme }) => css`
    padding: ${theme.padding.medium};
    background: ${theme.colors.white};
  `}
`;

export const InnerWrapper = styled(Column)`
  width: 350px;
`;
