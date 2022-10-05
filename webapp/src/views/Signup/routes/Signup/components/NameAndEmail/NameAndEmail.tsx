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

interface NameAndEmailProps {
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrorsImpl<DeepRequired<DefaultValues>>;
}

export const NameAndEmail = ({ register, errors }: NameAndEmailProps) => {
  const { t } = useTranslation();

  const userNameProps = useInput<DefaultValues>({
    register,
    name: 'userName',
    errors,
  });

  const userEmailProps = useInput<DefaultValues>({
    register,
    name: 'userEmail',
    errors,
  });

  return (
    <Fragment>
      <Input
        placeholder={t('common.name')}
        type="text"
        {...userNameProps}
      />

      <Spacer />

      <Input
        placeholder={t('common.email')}
        type="text"
        {...userEmailProps}
      />
    </Fragment>
  );
};
