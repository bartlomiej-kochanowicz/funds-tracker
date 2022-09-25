import { Input } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import { DeepMap, FieldArrayWithId, FieldError, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DefaultValues } from 'views/Introduction/components/AddCashAccountsForm/AddCashAccountsForm.type';

interface FieldProps extends FieldArrayWithId<DefaultValues, 'accounts', 'id'> {
  register: UseFormRegister<DefaultValues>;
  errors: Partial<DeepMap<DefaultValues, FieldError>>;
  index: number;
}

export const Field = ({ register, errors, index }: FieldProps) => {
  const { t } = useTranslation();

  const nameInputProps = useInput<DefaultValues>({
    register,
    name: `accounts.${index}.name`,
    errors,
  });

  return (
    <Input
      placeholder={t('add.instrument.name.placeholder')}
      {...nameInputProps}
    />
  );
};
