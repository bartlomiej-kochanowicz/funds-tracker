import styled, { css } from 'styled-components';
import { Column } from 'simple-flexbox';

export const FullscreenClear = styled(Column)`
  width: 100%;
  height: var(--doc-height);

  ${({ theme }) => css`
    padding: ${theme.padding.medium};
  `}
`;

FullscreenClear.displayName = 'LayoutFullscreenClear';
