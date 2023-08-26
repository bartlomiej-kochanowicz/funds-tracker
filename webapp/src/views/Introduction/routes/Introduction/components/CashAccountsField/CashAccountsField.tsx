import { Currency, IntroductionCreateCashAccountsInput } from '__generated__/graphql';
import { Box, Button, Icon, Input, Select, Spreader } from 'components/atoms';
import { CurrencyCombobox } from 'components/molecules';
import { CURRENCIES_ARRAY } from 'constants/selectors/currencies';
import { useRegisterCombobox } from 'hooks/useRegisterCombobox';
import { useSelect } from 'hooks/useSelect';
import { useMemo } from 'react';
import {
  Control,
  DeepRequired,
  FieldErrorsImpl,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';

interface CashAccountsFieldProps {
  register: UseFormRegister<IntroductionCreateCashAccountsInput>;
  control: Control<IntroductionCreateCashAccountsInput>;
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
  control,
}: CashAccountsFieldProps) => {
  const { t } = useTranslation();

  const currencySelectProps = useRegisterCombobox<IntroductionCreateCashAccountsInput>({
    control,
    name: `cashAccounts.${index}.currency`,
  });

  const handleRemoveField = async () => {
    remove(index);
  };

  return (
    <Box $flex>
      <Input
        placeholder={t('common.input.name.placeholder')}
        $flexGrow={1}
        {...register(`cashAccounts.${index}.name`)}
        error={errors.cashAccounts?.[index]?.name?.message}
      />

      <Spreader $spread="0.25" />

      <CurrencyCombobox
        $width="130px"
        {...currencySelectProps}
      />

      <Spreader $spread="0.25" />

      <Button
        $color="secondary"
        onClick={handleRemoveField}
        $boxShadow="none"
      >
        <Icon icon={FaTrash} />
      </Button>
    </Box>
  );
};
