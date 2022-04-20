import { ReactNode, forwardRef } from 'react';
import styled, { DefaultTheme, css } from 'styled-components';

type Size = 'small' | 'medium' | 'large';
type Type = 'button' | 'submit';

const defaultProps = {
  type: 'button' as Type,
  size: 'medium' as Size,
  color: 'blueBase' as DefaultTheme['colors']['blueBase'],
};

type ButtonProps = {
  children: ReactNode;
  size?: Size;
  type?: Type;
  color?: keyof DefaultTheme['colors'];
} & typeof defaultProps;

const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 10px;

  ${({ size, theme, color }) =>
    css`
      font-size: ${theme.buttonSizes[size].fontSize};
      background-color: ${theme.colors[color]};
      color: ${theme.colors.white};
      box-shadow: 0px 15px 31px -13px ${theme.colors[color]};
      padding: ${theme.buttonSizes[size].padding.map(p => p).join(' ')};
    `}
`;

export const Button = ({
  children,
  type,
  size,
  color,
}: ButtonProps): JSX.Element => (
  <StyledButton
    type={type}
    size={size}
    color={color}
  >
    {children}
  </StyledButton>
);

Button.defaultProps = defaultProps;
