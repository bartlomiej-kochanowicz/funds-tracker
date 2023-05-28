import { Currency } from '__generated__/graphql';
import { Input } from 'components/atoms';
import { InvestFundsFormValues } from 'modals/InvestFunds/helpers/defaultValues';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField } from '../FormField';

interface ITransactionCostFieldProps {
  activeCurrency: Currency;
}

export const TransactionCostField: FC<ITransactionCostFieldProps> = ({ activeCurrency }) => {
  const { t } = useTranslation();

  const { register } = useFormContext<InvestFundsFormValues>();

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.transaction_cost')}
      htmlFor="transaction_cost"
    >
      <Input
        id="transaction_cost"
        type="number"
        flexGrow={1}
        placeholder={t('modal.InvestFunds.form.input.transaction_cost.placeholder')}
        unit={activeCurrency}
        {...register('transaction_cost')}
      />
    </FormField>
  );
};
