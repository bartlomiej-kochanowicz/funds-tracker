import { Input, Spacer } from 'components/atoms';
import { ChangeEvent, Fragment } from 'react';
import { DeepRequired, FieldErrorsImpl, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type DefaultValues = {
  userName: string;
  userEmail: string;
  userPassword: string;
  userPasswordConfirmation: string;
};

interface PasswordsProps {
  setValue: UseFormSetValue<DefaultValues>;
  errors: FieldErrorsImpl<DeepRequired<DefaultValues>>;
}

export const Passwords = ({ setValue, errors }: PasswordsProps) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Input
        placeholder={t('common.password')}
        type="password"
        autoFocus
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue('userPassword', e.target.value)}
        error={errors.userPassword?.message}
      />

      <Spacer />

      <Input
        placeholder={t('page.signup.password.confirm')}
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue('userPasswordConfirmation', e.target.value)
        }
        error={errors.userPasswordConfirmation?.message}
      />
    </Fragment>
  );
};
