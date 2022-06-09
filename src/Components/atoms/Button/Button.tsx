import { HTMLProps, ReactNode } from 'react';
import styled, { DefaultTheme, css } from 'styled-components';
import { darken, transparentize } from 'color2k';

export type Size = 'small' | 'medium' | 'large';
export type ButtonColors = 'blue' | 'black';

interface ButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'size'> {
  children: ReactNode;
  size?: Size;
  color?: ButtonColors;
  fontWeight?: keyof DefaultTheme['font']['weight'];
}

export const Button = styled.button<ButtonProps>`
  display: block;
  width: fit-content;
  border: none;
  position: relative;
  transition: 0.2s all;

  ${({ theme, size = 'medium' as Size, color = 'blue' as ButtonColors, fontWeight = '400' }) =>
    css`
      font-size: ${theme.button.size[size].fontSize};
      background-color: ${theme.button.color[color].background};
      color: ${theme.button.color[color].font};
      box-shadow: 7px 6px 28px 1px ${transparentize(theme.button.color[color].background, 0.76)};
      padding: ${theme.button.size[size].padding.map(p => p).join(' ')};
      font-weight: ${fontWeight};
      border-radius: ${theme.radius.primary};

      &:hover {
        cursor: pointer;
        transition-duration: 0.1s;
        background-color: ${darken(theme.button.color[color].background, 0.05)};
      }

      &:active {
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px ${transparentize(theme.button.color[color].background, 0.76)};
      }
    `}
`;

Button.displayName = 'Button';
