import { ReactNode } from 'react';
import styled, { DefaultTheme, css } from 'styled-components';
import { Colors } from 'styles/styled';

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

  ${({ size, theme, color, fontWeight, background }) =>
    css`
      font-size: ${theme.buttonSizes[size].fontSize};
      background-color: ${theme.colors[background]};
      color: ${theme.colors[color]};
      box-shadow: 0px 15px 31px -13px ${theme.colors[background]};
      padding: ${theme.buttonSizes[size].padding.map(p => p).join(' ')};
      font-weight: ${fontWeight};
      border-radius: ${theme.radius.primary};
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
