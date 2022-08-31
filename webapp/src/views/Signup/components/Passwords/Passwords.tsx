import { Input, Spacer } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import { Fragment } from 'react';
import { DeepRequired, FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type DefaultValues = {
  userName: string;
  userEmail: string;
  userPassword: string;
  userPasswordConfirmation: string;
};

interface PasswordsProps {
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrorsImpl<DeepRequired<DefaultValues>>;
}

export const Passwords = ({ register, errors }: PasswordsProps) => {
  const { t } = useTranslation();

  const userPasswordProps = useInput<DefaultValues>({
    register,
    name: 'userPassword',
    errors,
  });

  const userPasswordConfirmationProps = useInput<DefaultValues>({
    register,
    name: 'userPasswordConfirmation',
    errors,
  });

  return (
    <Fragment>
      <Input
        placeholder={t('common.password')}
        type="password"
        {...userPasswordProps}
      />

      <Spacer />

      <Input
        placeholder={t('page.signup.password.confirm')}
        type="password"
        {...userPasswordConfirmationProps}
      />
    </Fragment>
  );
};
