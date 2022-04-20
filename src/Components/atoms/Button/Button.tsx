import { ReactNode } from 'react';
import styled, { DefaultTheme, css } from 'styled-components';

type Size = 'small' | 'medium' | 'large';
type Type = 'button' | 'submit';

const defaultProps = {
  type: 'button' as Type,
  size: 'medium' as Size,
  color: 'blueBase' as DefaultTheme['colors']['blueBase'],
  fontWeight: 300,
};

type ButtonProps = {
  children: ReactNode;
  size?: Size;
  type?: Type;
  color?: keyof DefaultTheme['colors'];
  fontWeight?: keyof DefaultTheme['font']['weight'];
} & typeof defaultProps;

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 10px;

  ${({ size, theme, color, fontWeight }) =>
    css`
      font-size: ${theme.buttonSizes[size].fontSize};
      background-color: ${theme.colors[color]};
      color: ${theme.colors.white};
      box-shadow: 0px 15px 31px -13px ${theme.colors[color]};
      padding: ${theme.buttonSizes[size].padding.map(p => p).join(' ')};
      font-weight: ${fontWeight};
    `}
`;

export const Button = ({
  children,
  type,
  size,
  color,
  fontWeight,
}: ButtonProps): JSX.Element => (
  <StyledButton
    type={type}
    size={size}
    color={color}
    fontWeight={fontWeight}
  >
    {children}
  </StyledButton>
);

Button.defaultProps = defaultProps;
