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
import { Currency, IntroductionCreateCashAccountsInput } from '__generated__/graphql';

interface CashAccountsFieldProps {
  register: UseFormRegister<IntroductionCreateCashAccountsInput>;
  errors: FieldErrorsImpl<DeepRequired<IntroductionCreateCashAccountsInput>>;
  index: number;
  defaultValue: Currency;
  remove: UseFieldArrayRemove;
}

export const CashAccountsField = ({
  register,
  errors,
  index,
  defaultValue,
  remove,
}: CashAccountsFieldProps) => {
  const { t } = useTranslation();

  const nameInputProps = useInput<IntroductionCreateCashAccountsInput>({
    register,
    name: `cashAccounts.${index}.name`,
    errors,
  });

  const currencySelectProps = useSelect<IntroductionCreateCashAccountsInput>({
    register,
    name: `cashAccounts.${index}.currency`,
    errors,
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

  const handleRemoveField = async () => {
    remove(index);
  };

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
        defaultValue={defaultValue}
        {...currencySelectProps}
      />

      <Spreader spread="tiny" />

      <Button
        borderRadius="secondary"
        color="secondary"
        onClick={handleRemoveField}
        boxShadow="none"
      >
        <FaTrash />
      </Button>
    </Row>
  );
};
