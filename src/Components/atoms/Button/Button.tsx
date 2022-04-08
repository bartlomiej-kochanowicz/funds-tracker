import { FC } from 'react';

type ButtonProps = {
  children: React.ReactNode;
  submit?: boolean;
};

const defaultProps = {
  submit: false,
};

export const Button: FC<ButtonProps & typeof defaultProps> = ({
  children,
  submit,
}): JSX.Element => (
  <button type={submit ? 'submit' : 'button'}>{children}</button>
);

Button.defaultProps = defaultProps;
