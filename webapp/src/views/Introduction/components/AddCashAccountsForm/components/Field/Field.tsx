import { useMemo } from 'react';
import { Button, Input, Select, Spreader } from 'components/atoms';
import { CURRENCIES_ARRAY } from 'constants/selectors/currencies';
import { useInput } from 'hooks/useInput';
import { useSelect } from 'hooks/useSelect';
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { Row } from 'simple-flexbox';
import { DefaultValues } from 'views/Introduction/components/AddCashAccountsForm/AddCashAccountsForm.type';

interface FieldProps {
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrorsImpl<DeepRequired<DefaultValues>>;
  index: number;
  values: DefaultValues;
  remove: UseFieldArrayRemove;
}

export const Field = ({ register, errors, index, values, remove }: FieldProps) => {
  const { t } = useTranslation();

  const nameInputProps = useInput<DefaultValues>({
    register,
    name: `accounts.${index}.name`,
    errors,
  });

  const currencySelectProps = useSelect<DefaultValues>({
    register,
    name: `accounts.${index}.currency`,
    errors,
    defaultValues: values,
  });

  const options = useMemo(
    () =>
      CURRENCIES_ARRAY.map(currency => ({
        label: t(`currency.${currency}`),
        value: currency,
      })),
    [t],
  );

  const customLabel = ({ value }: { value: string }) => value;

  const handleRemoveField = () => remove(index);

  return (
    <Row>
      <Input
        placeholder={t('common.input.name.placeholder')}
        flexGrow={1}
        {...nameInputProps}
      />

      <Spreader spread="tiny" />

      <Select
        width="130px"
        options={options}
        customLabel={customLabel}
        {...currencySelectProps}
      />

      <Spreader spread="tiny" />

      <Button
        borderRadius="secondary"
        color="black"
        onClick={handleRemoveField}
        boxShadow="none"
      >
        <FaTrash />
      </Button>
    </Row>
  );
};
