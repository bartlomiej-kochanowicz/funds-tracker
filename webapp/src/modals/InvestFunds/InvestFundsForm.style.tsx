import styled, { css } from 'styled-components';

export const Form = styled.form`
  display: flex;

  ${({ theme }) => css`
    ${theme.breakpoints.phone.max} {
      flex-direction: column;
    }
  `}
`;
