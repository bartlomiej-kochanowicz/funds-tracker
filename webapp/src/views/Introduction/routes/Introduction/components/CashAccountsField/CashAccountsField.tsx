import { useMemo } from 'react';
import { Button, Input, Loader, Select, Spreader } from 'components/atoms';
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
import { GetCashAccountsIntroductionQuery } from '__generated__/graphql';
import { useMutation } from '@apollo/client';
import { DELETE_CASH_ACCOUNT } from 'graphql/mutations/DeleteCashAccount';

interface CashAccountsFieldProps {
  register: UseFormRegister<GetCashAccountsIntroductionQuery>;
  errors: FieldErrorsImpl<DeepRequired<GetCashAccountsIntroductionQuery>>;
  index: number;
  values: GetCashAccountsIntroductionQuery;
  remove: UseFieldArrayRemove;
  uuid: string;
}

export const CashAccountsField = ({
  register,
  errors,
  index,
  values,
  remove,
  uuid,
}: CashAccountsFieldProps) => {
  const { t } = useTranslation();

  const nameInputProps = useInput<GetCashAccountsIntroductionQuery>({
    register,
    name: `cashAccounts.${index}.name`,
    errors,
  });

  const currencySelectProps = useSelect<GetCashAccountsIntroductionQuery>({
    register,
    name: `cashAccounts.${index}.currency`,
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

  const [removeCashAccount, { loading }] = useMutation(DELETE_CASH_ACCOUNT);

  const handleRemoveField = async () => {
    if (uuid) {
      await removeCashAccount({ variables: { uuid } });
    }

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
        {...currencySelectProps}
      />

      <Spreader spread="tiny" />

      <Button
        borderRadius="secondary"
        color="secondary"
        onClick={handleRemoveField}
        disabled={loading}
        boxShadow="none"
      >
        {loading ? <Loader /> : <FaTrash />}
      </Button>
    </Row>
  );
};
