import { FC } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  children: React.ReactNode;
  submit?: boolean;
};

const defaultProps = {
  submit: false,
};

const StyledButton = styled.button`
  color: red;
`;

export const Button: FC<ButtonProps & typeof defaultProps> = ({
  children,
  submit,
}): JSX.Element => (
  <button type={submit ? 'submit' : 'button'}>{children}</button>
);

Button.defaultProps = defaultProps;
