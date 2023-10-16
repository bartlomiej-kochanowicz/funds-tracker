import { Box } from 'components/atoms';
import styled, { css } from 'styled-components';

export const StyledColumn = styled(Box).attrs({
  $flex: true,
  $flexDirection: 'column',
})`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  height: var(--doc-height);

  ${({ theme: { zIndex, spacing } }) => css`
    z-index: ${zIndex.sidebar};
    padding: ${spacing['1.5']} 0 ${spacing['3.5']} ${spacing['1']};
  `}
`;
