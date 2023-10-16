import { Box } from 'components/atoms';
import styled, { css } from 'styled-components';

export const Wrapper = styled(Box).attrs({
  $flex: true,
  $flexDirection: 'column',
})`
  ${({ theme }) => css`
    ${theme.breakpoints.phone.min} {
      padding: 0 calc(${theme.spacing['3.5']} + ${theme.spacing['1.5']});
    }
  `}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  ${({ theme }) => css`
    ${theme.breakpoints.phone.min} {
      grid-template-columns: repeat(5, 1fr);
    }
  `}
`;
