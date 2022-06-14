import { HTMLProps } from 'react';
import styled, { css } from 'styled-components';
import { darken } from 'color2k';

interface InputProps extends HTMLProps<HTMLButtonElement> {}

export const Input = styled.input<InputProps>`
  border: none;

  ${({ theme }) => css`
    border-radius: ${theme.radius.secondary};
    background-color: ${theme.colors.lightGray};
    padding: 0.5rem 1.25rem;
    outline-color: ${theme.colors.blue};
    color: ${theme.colors.black};
    font-weight: ${theme.font.weight[500]};

    &:focus {
      background-color: ${darken(theme.colors.lightGray, 0.05)};
      color: ${theme.colors.blue};
    }

    &::placeholder {
      color: ${theme.colors.gray};
    }
  `}
`;

Input.displayName = 'Input';
