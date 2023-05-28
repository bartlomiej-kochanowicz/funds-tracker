import { Currency } from '__generated__/graphql';
import { Input } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
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

  const isPhone = useBreakpoint('phone', 'max');

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.transaction_cost')}
      htmlFor="transaction_cost"
    >
      <Input
        id="transaction_cost"
        type="number"
        flexGrow={1}
        width={isPhone ? '100%' : 'auto'}
        placeholder={t('modal.InvestFunds.form.input.transaction_cost.placeholder')}
        unit={activeCurrency}
        {...register('transaction_cost')}
      />
    </FormField>
  );
};
