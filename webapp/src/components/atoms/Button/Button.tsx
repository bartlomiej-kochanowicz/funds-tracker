import { HTMLProps, ReactNode, ComponentProps } from 'react';
import styled, { DefaultTheme, css } from 'styled-components';
import { darken, transparentize } from 'color2k';
import { Link } from 'react-router-dom';

export type Size = 'small' | 'medium' | 'large';
export type ButtonColors = 'blue' | 'black';

type CommonProps = {
  children: ReactNode;
  size?: Size;
  color?: ButtonColors;
  width?: 'auto' | 'fit-content' | `${number}px` | `${number}%`;
  fontWeight?: keyof DefaultTheme['font']['weight'];
  borderRadius?: keyof DefaultTheme['radius'];
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

export const Button = styled.div.withConfig({
  shouldForwardProp: prop => !['width', 'fontWeight', 'borderRadius', 'color'].includes(prop),
})<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  position: relative;
  transition: 0.2s all;
  text-decoration: none;

  ${({
    theme,
    size = 'medium',
    color = 'blue',
    width = 'fit-content',
    fontWeight = '400',
    borderRadius = 'primary',
  }) =>
    css`
      font-size: ${theme.button.size[size].fontSize};
      background-color: ${theme.button.color[color].background};
      color: ${theme.button.color[color].font};
      box-shadow: 7px 6px 28px 1px ${transparentize(theme.button.color[color].background, 0.76)};
      padding: ${theme.padding[size]};
      font-weight: ${fontWeight};
      border-radius: ${theme.radius[borderRadius]};
      width: ${width};

      &:hover {
        cursor: pointer;
        transition-duration: 0.1s;
        background-color: ${darken(theme.button.color[color].background, 0.05)};
      }

      &:active:not(&:disabled) {
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px ${transparentize(theme.button.color[color].background, 0.76)};
      }

      &:disabled {
        cursor: not-allowed;
        background-color: ${transparentize(theme.button.color[color].background, 0.5)};
        color: ${transparentize(theme.button.color[color].font, 0.5)};
      }
    `}
`;

Button.displayName = 'Button';

Button.defaultProps = {
  size: 'medium',
  color: 'blue',
  width: 'fit-content',
  fontWeight: '500',
  borderRadius: 'primary',
  to: undefined,
  as: 'button',
};
