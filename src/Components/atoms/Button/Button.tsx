import { FC } from 'react';
/* import styled from 'styled-components'; */

type ButtonProps = {
  children: React.ReactNode;
  submit?: boolean;
};

const defaultProps = {
  submit: false,
};

export const Button: FC<ButtonProps> = ({ children, submit }): JSX.Element => (
  <button type={submit ? 'submit' : 'button'}>{children}</button>
);

Button.defaultProps = defaultProps;
