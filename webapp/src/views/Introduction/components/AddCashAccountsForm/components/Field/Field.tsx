import { Input } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import { DefaultValues } from 'views/Introduction/components/AddCashAccountsForm/AddCashAccountsForm.type';

export const Field = ({ register, errors }) => {
  const nameInputProps = useInput<DefaultValues>({
    register,
    name: 'instrumentName',
    errors,
  });

  return (
    <Input
      placeholder={t('add.instrument.name.placeholder')}
      {...nameInputProps}
    />
  );
};
