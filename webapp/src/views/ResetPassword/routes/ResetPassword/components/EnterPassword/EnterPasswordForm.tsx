import { FC } from 'react';

interface EnterPasswordFormProps {
  token: string;
}

export const EnterPasswordForm: FC<EnterPasswordFormProps> = ({ token }) => {
  return <div>form</div>;
};

EnterPasswordForm.displayName = 'EnterPasswordForm';
