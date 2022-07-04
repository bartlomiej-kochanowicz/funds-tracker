import styled, { css } from 'styled-components';
import { Column } from 'simple-flexbox';

type FullscreenClearProps = {
  background?: 'primary' | 'secondary' | 'tertiary';
};

export const FullscreenClear = styled(Column)<FullscreenClearProps>`
  width: 100%;
  height: var(--doc-height);

  ${({ theme, background = 'primary' }) => css`
    background: ${theme.gradients[background]};
    padding: ${theme.padding.medium};
  `}
`;

FullscreenClear.displayName = 'LayoutFullscreenClear';

FullscreenClear.defaultProps = {
  background: 'primary',
};
