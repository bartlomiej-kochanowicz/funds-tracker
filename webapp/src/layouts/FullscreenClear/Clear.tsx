import styled, { css } from 'styled-components';
import { Row } from 'simple-flexbox';

export const FullscreenClear = styled(Row)`
  width: 100%;
  height: var(--doc-height);

  ${({ theme }) => css`
    background: ${theme.gradients.secondary};
    padding: ${theme.padding.medium};
  `}
`;
