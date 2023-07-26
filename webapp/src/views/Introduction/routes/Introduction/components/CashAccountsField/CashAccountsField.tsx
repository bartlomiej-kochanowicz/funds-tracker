import { Currency, IntroductionCreateCashAccountsInput } from '__generated__/graphql';
import { Box, Button, Icon, Input, Select, Spreader } from 'components/atoms';
import { CURRENCIES_ARRAY } from 'constants/selectors/currencies';
import { useSelect } from 'hooks/useSelect';
import { useMemo } from 'react';
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';

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

  const currencySelectProps = useSelect<IntroductionCreateCashAccountsInput>({
    register,
    name: `cashAccounts.${index}.currency`,
    errors,
  });

  const items = useMemo(
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
    <Box $flex>
      <Input
        placeholder={t('common.input.name.placeholder')}
        flexGrow={1}
        {...register(`cashAccounts.${index}.name`)}
        error={errors.cashAccounts?.[index]?.name?.message}
      />

      <Spreader $spread="0.25" />

      <Select
        width="130px"
        items={items}
        customLabel={customLabel}
        {...currencySelectProps}
      />

      <Spreader $spread="0.25" />

      <Button
        color="secondary"
        onClick={handleRemoveField}
        boxShadow="none"
      >
        <Icon icon={FaTrash} />
      </Button>
    </Box>
  );
};
