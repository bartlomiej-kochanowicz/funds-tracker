import { Column } from 'simple-flexbox';
import styled, { css } from 'styled-components';

export const Wrapper = styled(Column)`
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
