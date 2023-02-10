import { HTMLProps, ReactNode, ComponentProps } from 'react';
import type { DefaultTheme } from 'styled-components';
import styled, { css } from 'styled-components';
import { darken, transparentize } from 'color2k';
import { Link } from 'react-router-dom';

export type Size = 'small' | 'medium' | 'large';

export type ButtonColors = keyof DefaultTheme['button']['color'];

type CommonProps = {
  children: ReactNode;
  size?: Size;
  color?: ButtonColors;
  width?: 'auto' | 'fit-content' | `${number}px` | `${number}%`;
  fontWeight?: keyof DefaultTheme['font']['weight'];
  borderRadius?: keyof DefaultTheme['radius'];
  to?: string;
  boxShadow?: 'default' | 'none';
  flexGrow?: number;
  outline?: boolean;
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

export const Button = styled.button.withConfig({
  shouldForwardProp: prop =>
    !['width', 'fontWeight', 'borderRadius', 'color', 'boxShadow', 'flexGrow', 'outline'].includes(
      prop,
    ),
})<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  position: relative;
  transition: 0.2s all;
  text-decoration: none;
  cursor: pointer;

  ${({
    theme,
    size = 'medium',
    color = 'primary',
    width = 'fit-content',
    fontWeight = '400',
    borderRadius = 'primary',
    boxShadow = 'default',
    flexGrow = 0,
    outline = false,
  }) =>
    css`
      font-size: ${theme.button.size[size].fontSize};
      background-color: ${theme.button.color[color].background};
      color: ${theme.button.color[color].font};
      padding: ${theme.padding[size]};
      font-weight: ${fontWeight};
      border-radius: ${theme.radius[borderRadius]};
      width: ${width};
      box-shadow: ${() => {
        switch (boxShadow) {
          case 'default':
            return css`7px 6px 28px 1px ${transparentize(theme.colors.black, 0.76)}`;
          case 'none':
          default:
            return 'none';
        }
      }};

      &:active:not(&:disabled) {
        transform: scale(0.98);
        box-shadow: ${() => {
          switch (boxShadow) {
            case 'default':
              return css`3px 2px 22px 1px ${transparentize(theme.colors.black, 0.76)}`;
            case 'none':
            default:
              return 'none';
          }
        }};
      }

      &:hover {
        transition-duration: 0.1s;
        background-color: ${darken(theme.button.color[color].background, 0.05)};
      }

      &:disabled {
        cursor: not-allowed;
        background-color: ${transparentize(theme.button.color[color].background, 0.5)};
        color: ${transparentize(theme.button.color[color].font, 0.5)};
      }

      ${Boolean(flexGrow) &&
      css`
        flex-grow: ${flexGrow};
      `}

      ${Boolean(outline) &&
      css`
        border: 3px solid ${theme.button.color[color].background};
        color: ${theme.button.color[color].background};
        background-color: transparent;

        &:hover {
          background-color: ${transparentize(theme.button.color[color].background, 0.95)};
        }

        &:active:not(&:disabled) {
          transform: scale(0.98);
        }

        &:disabled {
          cursor: not-allowed;
          background-color: ${transparentize(theme.button.color[color].background, 0.5)};
          color: ${transparentize(theme.button.color[color].font, 0.5)};
        }
      `}
    `}
`;

Button.displayName = 'Button';
