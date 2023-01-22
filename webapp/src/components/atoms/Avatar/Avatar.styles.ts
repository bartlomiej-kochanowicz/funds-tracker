import { Row } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const Circle = styled(Row)`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  ${({ theme }) => css`
    background: ${theme.colors.blue};
    background: ${theme.gradients.blue}};
  `}
`;
