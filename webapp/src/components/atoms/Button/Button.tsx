import { HTMLProps, ReactNode, ComponentProps } from 'react';
import styled, { DefaultTheme, css } from 'styled-components';
import { darken, transparentize } from 'color2k';
import { Link } from 'react-router-dom';

export type Size = 'small' | 'medium' | 'large';
export type ButtonColors = 'blue' | 'black';
export type Variant = 'primary' | 'secondary';

type CommonProps = {
  children: ReactNode;
  size?: Size;
  color?: ButtonColors;
  fontWeight?: keyof DefaultTheme['font']['weight'];
  to?: string;
};

type NativeButtonProps = Omit<
  HTMLProps<HTMLButtonElement>,
  'size' | 'color' | 'sizes' | 'children'
>;

type ReactRouterLinkProps = Omit<ComponentProps<typeof Link>, 'children'>;

type ButtonProps = CommonProps &
  (
    | ({
        as?: 'button';
      } & NativeButtonProps)
    | ({
        as?: typeof Link;
      } & ReactRouterLinkProps)
  );

export const Button = styled.div<ButtonProps>`
  display: block;
  width: fit-content;
  border: none;
  position: relative;
  transition: 0.2s all;

  ${({ theme, size = 'medium', color = 'blue', fontWeight = '400' }) =>
    css`
      font-size: ${theme.button.size[size].fontSize};
      background-color: ${theme.button.color[color].background};
      color: ${theme.button.color[color].font};
      box-shadow: 7px 6px 28px 1px ${transparentize(theme.button.color[color].background, 0.76)};
      padding: ${theme.padding[size]};
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

Button.defaultProps = {
  size: 'medium',
  color: 'blue',
  fontWeight: '500',
  to: undefined,
  as: 'button',
};
