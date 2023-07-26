import { darken } from 'color2k';
import { HTMLProps } from 'react';
import styled, { css } from 'styled-components';

export const StyledButton = styled.button<
  HTMLProps<Omit<HTMLButtonElement, 'error'>> & { $error: boolean }
>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
  min-height: 44px;

  ${({ theme, $error }) => css`
    border-radius: ${theme.radius['0.7']};
    border: none;
    background-color: ${theme.colors.gray100};
    padding: ${theme.padding.medium};
    color: ${theme.colors[$error ? 'error' : 'text']};
    font-weight: ${theme.font.weight[500]};
    border: 2px solid ${theme.colors[$error ? 'error' : 'gray300']};

    &:focus-visible {
      outline: 2px solid ${theme.colors[$error ? 'error' : 'blue']};
    }

    &:focus {
      background-color: ${darken(theme.colors.gray100, 0.05)};
      color: ${theme.colors[$error ? 'error' : 'blue']};
      border: 2px solid ${theme.colors[$error ? 'error' : 'blue']};
      outline-style: solid;
      outline-width: 2px;
      outline-offset: -2px;
    }

    &::placeholder {
      color: ${theme.colors.gray300};
    }
  `}
`;

export const StyledContent = styled.div<{
  $isSelected: boolean;
}>`
  color: ${({ theme, $isSelected }) => ($isSelected ? 'inline' : theme.colors.gray300)};
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
