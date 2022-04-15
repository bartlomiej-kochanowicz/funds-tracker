import styled, { DefaultTheme } from 'styled-components';

type Size = 'small' | 'medium' | 'large';
type Type = 'button' | 'submit';

const defaultProps = {
  type: 'button' as Type,
  size: 'medium' as Size,
  color: 'blueBase' as DefaultTheme['colors']['blueBase'],
};

type ButtonProps = {
  children: React.ReactNode;
  size?: Size;
  type?: Type;
  color?: keyof DefaultTheme['colors'];
} & typeof defaultProps;

const StyledButton = styled.button<ButtonProps>`
  border: none;
  background-color: ${({ theme, color }) => theme.colors[color]};
  color: ${({ theme }) => theme.colors.white};
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
