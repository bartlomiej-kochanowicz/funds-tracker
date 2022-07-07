import styled, { css } from 'styled-components';
import { darken } from 'color2k';

export const StyledInput = styled.input<{ error: boolean }>`
  border: none;
  width: 100%;

  ${({ theme, error }) => css`
    border-radius: ${theme.radius.secondary};
    background-color: ${theme.colors.lightGray};
    padding: 0.5rem 1.25rem;
    outline-color: ${theme.colors[error ? 'red' : 'blue']};
    color: ${theme.colors[error ? 'red' : 'black']};
    font-weight: ${theme.font.weight[500]};
    border: 2px solid ${theme.colors[error ? 'red' : 'gray']};

    &:focus {
      background-color: ${darken(theme.colors.lightGray, 0.05)};
      color: ${theme.colors[error ? 'red' : 'blue']};
    }

    &::placeholder {
      color: ${theme.colors.gray};
    }
  `}
`;

export const Wrapper = styled.div`
  position: relative;
  width: auto;
`;

export const Error = styled.span`
  position: absolute;
  left: 0;
  bottom: -1.25rem;

  ${({ theme }) => css`
    font-size: ${theme.font.size['0.75']};
    color: ${theme.colors.red};
  `}
`;
