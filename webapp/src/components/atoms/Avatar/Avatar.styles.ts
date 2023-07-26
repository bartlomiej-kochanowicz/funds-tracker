import styled, { css } from 'styled-components';

import { Box } from '../Box';

export const Circle = styled(Box).attrs({
  $flex: true,
  $justifyContent: 'center',
  $alignItems: 'center',
})`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  ${({ theme }) => css`
    background: ${theme.colors.blue};
    background: ${theme.gradients.blue};
    margin: ${theme.padding.mediumY};
  `}
`;
