import { ReactNode } from 'react';
import styled, { DefaultTheme, css } from 'styled-components';
import { Colors } from 'styles/styled';
import { darken, transparentize } from 'color2k';

type Size = 'small' | 'medium' | 'large';
type Type = 'button' | 'submit';

const defaultProps = {
  type: 'button' as Type,
  size: 'medium' as Size,
  color: 'white' as Colors,
  background: 'blueBase' as Colors,
  fontWeight: 400,
};

type ButtonProps = {
  children: ReactNode;
  size?: Size;
  type?: Type;
  color?: Colors;
  background?: Colors;
  fontWeight?: keyof DefaultTheme['font']['weight'];
} & typeof defaultProps;

const StyledButton = styled.button<ButtonProps>`
  border: none;
  position: relative;
  transition: 0.2s all;

  ${({ size, theme, color, fontWeight, background }) =>
    css`
      font-size: ${theme.buttonSizes[size].fontSize};
      background-color: ${theme.colors[background]};
      color: ${theme.colors[color]};
      box-shadow: 7px 6px 28px 1px ${transparentize(theme.colors[background], 0.76)};
      padding: ${theme.buttonSizes[size].padding.map(p => p).join(' ')};
      font-weight: ${fontWeight};
      border-radius: ${theme.radius.primary};

      &:hover {
        cursor: pointer;
        transition-duration: 0.1s;
        background-color: ${darken(theme.colors[background], 0.05)};
      }

      &:active {
        transform: scale(0.98);
        box-shadow: 3px 2px 22px 1px ${transparentize(theme.colors[background], 0.76)};
      }
    `}
`;

export const Button = ({
  children,
  type,
  size,
  color,
  fontWeight,
  background,
}: ButtonProps): JSX.Element => (
  <StyledButton
    type={type}
    size={size}
    color={color}
    fontWeight={fontWeight}
    background={background}
  >
    {children}
  </StyledButton>
);

Button.defaultProps = defaultProps;
