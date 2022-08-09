import styled from 'styled-components';
import { FullscreenClear } from 'layouts/FullscreenClear';

export const StyledFullscreenClear = styled(FullscreenClear)`
  background: ${({ theme }) => theme.gradients.secondary};
`;
