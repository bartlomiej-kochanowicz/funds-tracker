import { Row } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const Wrapper = styled(Row)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  ${({ theme }) => css`
    padding: ${theme.spacing.large};
  `}
`;
