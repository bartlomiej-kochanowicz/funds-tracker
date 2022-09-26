import { HTMLProps } from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'color2k';

export const StyledButton = styled.button<
  HTMLProps<Omit<HTMLButtonElement, 'error'>> & { error: boolean }
>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
  min-height: 44px;

  ${({ theme, error }) => css`
    border-radius: ${theme.radius.secondary};
    border: none;
    background-color: ${theme.colors.lightGray};
    padding: ${theme.padding.medium};
    color: ${theme.colors[error ? 'red' : 'black']};
    outline-color: ${theme.colors[error ? 'red' : 'blue']};
    font-weight: ${theme.font.weight[500]};
    border: 2px solid ${theme.colors[error ? 'red' : 'gray']};

    &:focus {
      background-color: ${darken(theme.colors.lightGray, 0.05)};
      color: ${theme.colors[error ? 'red' : 'blue']};
      border: 2px solid ${theme.colors[error ? 'red' : 'blue']};
    }

    &::placeholder {
      color: ${theme.colors.gray};
    }
  `}
`;

export const StyledContent = styled.div<{
  isSelected: boolean;
}>`
  color: ${({ theme, isSelected }) => (isSelected ? 'inline' : theme.colors.gray)};
`;

export const Wrapper = styled.div.withConfig({
  shouldForwardProp: prop => !['width', 'flexGrow'].includes(prop),
})<{ width?: 'auto' | '100%' | `${number}px`; flexGrow?: number }>`
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
    color: ${theme.colors.red};
  `}
`;
