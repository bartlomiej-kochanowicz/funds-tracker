import styled, { css } from 'styled-components';
import { darken, transparentize } from 'color2k';

export const StyledInput = styled.input<{ error: boolean; hasUnit: boolean }>`
  border: none;
  width: 100%;

  ${({ theme, error, hasUnit }) => css`
    border-radius: ${theme.radius.secondary};
    padding: ${hasUnit ? '0.5rem 2.5rem 0.5rem 1.25rem' : '0.5rem 1.25rem'};
    outline-color: ${theme.colors[error ? 'error' : 'blue']};
    font-weight: ${theme.font.weight[500]};
    background-color: ${theme.colors.gray100};
    color: ${theme.colors[error ? 'error' : 'black']};
    border: 2px solid ${theme.colors[error ? 'error' : 'gray300']};

    &:focus {
      background-color: ${darken(theme.colors.gray100, 0.05)};
      color: ${theme.colors[error ? 'error' : 'blue']};
    }

    &:disabled {
      cursor: not-allowed;
      background-color: ${transparentize(theme.colors.gray100, 0.5)};
      color: ${transparentize(theme.colors.black, 0.5)};
      border: 2px solid ${transparentize(theme.colors.gray300, 0.5)};
    }

    &::placeholder {
      color: ${theme.colors.gray300};
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

export const Wrapper = styled.div.withConfig({
  shouldForwardProp: prop => !['width', 'flexGrow'].includes(prop),
})<{ width?: 'auto' | 'fit-content' | `${number}px` | `${number}%`; flexGrow?: number }>`
  position: relative;
  width: ${({ width }) => width};

  ${({ flexGrow }) =>
    flexGrow &&
    css`
      flex-grow: ${flexGrow};
    `}
`;

export const Error = styled.span`
  position: absolute;
  left: 0;
  bottom: -1.25rem;

  ${({ theme }) => css`
    font-size: ${theme.font.size['0.75']};
    color: ${theme.colors.error};
  `}
`;

export const Unit = styled.span`
  color: ${({ theme }) => theme.colors.gray300};
  position: absolute;
  line-height: 2.75rem;
  right: 1.25rem;
  top: 0;
  bottom: 0;
`;
