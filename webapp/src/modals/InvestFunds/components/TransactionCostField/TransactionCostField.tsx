import { Currency } from '__generated__/graphql';
import { Input } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
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

  const { register, getFieldState, watch, setValue } = useFormContext<InvestFundsFormValues>();

  const isPhone = useBreakpoint('phone', 'max');

  const { error } = getFieldState('transaction_cost');

  const watchQuantity = watch('quantity');
  const watchPrice = watch('price');
  const watchCommission = watch('commission');

  useUpdateEffect(() => {
    if (watchQuantity && watchPrice && watchCommission) {
      const transactionCost = watchQuantity * Number(watchPrice) + Number(watchCommission);
      setValue('transaction_cost', String(transactionCost));
    }
  }, [watchQuantity, watchPrice, watchCommission]);

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.transaction_cost')}
      htmlFor="transaction_cost"
    >
      <Input
        id="transaction_cost"
        type="currency"
        flexGrow={1}
        width={isPhone ? '100%' : 'auto'}
        placeholder={t('modal.InvestFunds.form.input.transaction_cost.placeholder')}
        currency={activeCurrency}
        error={error?.message}
        {...register('transaction_cost')}
      />
    </FormField>
  );
};
