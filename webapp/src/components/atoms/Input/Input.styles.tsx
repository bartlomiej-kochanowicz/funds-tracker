import styled, { css } from 'styled-components';
import { darken } from 'color2k';

export const StyledInput = styled.input<{ error: boolean; hasUnit: boolean }>`
  border: none;
  width: 100%;

  ${({ theme, error, hasUnit }) => css`
    border-radius: ${theme.radius.secondary};
    background-color: ${theme.colors.lightGray};
    padding: ${hasUnit ? '0.5rem 2.5rem 0.5rem 1.25rem' : '0.5rem 1.25rem'};
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

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
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

export const Unit = styled.span`
  color: ${({ theme }) => theme.colors.gray};
  position: absolute;
  line-height: 2.75rem;
  right: 1.25rem;
  top: 0;
  bottom: 0;
`;
