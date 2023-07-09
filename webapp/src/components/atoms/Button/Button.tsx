import { darken, transparentize } from 'color2k';
import { ComponentProps, HTMLProps, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { DefaultTheme } from 'styled-components';
import styled, { css } from 'styled-components';

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
  minWidth?: `${number}px`;
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

export const Button = styled.button
  .withConfig({
    shouldForwardProp: prop =>
      ![
        'width',
        'fontWeight',
        'borderRadius',
        'color',
        'boxShadow',
        'flexGrow',
        'outline',
        'minWidth',
        'isOpen',
        'theme',
      ].includes(prop),
  })
  .attrs(props => ({ type: 'button', ...props }))<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  position: relative;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  touch-action: none;

  ${({
    theme,
    size = 'medium',
    color = 'primary',
    width = 'fit-content',
    fontWeight = '400',
    borderRadius = '0.7',
    flexGrow = 0,
    outline = false,
    minWidth,
  }) => css`
    font-size: ${theme.button.size[size].fontSize};
    background-color: ${theme.button.color[color].background};
    color: ${theme.button.color[color].font};
    padding: ${theme.padding[size]};
    font-weight: ${fontWeight};
    border-radius: ${theme.radius[borderRadius]};
    width: ${width};
    transition: ${theme.transition.primary} all;

    ${minWidth && `min-width: ${minWidth};`}

    &:active:not(&:disabled) {
      transform: scale(0.98);
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
      color: ${theme.button.color[color].background};
      background-color: ${transparentize(theme.button.color[color].background, 0.8)};

      &:hover {
        background-color: ${transparentize(theme.button.color[color].background, 0.85)};
      }

      &:active:not(&:disabled) {
        transform: scale(0.98);
      }

      &:disabled {
        cursor: not-allowed;
        border: 2px solid ${transparentize(theme.button.color[color].background, 0.5)};
        color: ${transparentize(theme.button.color[color].background, 0.5)};
        background-color: transparent;
      }
    `}
  `};
`;

Button.displayName = 'Button';
