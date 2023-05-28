import { Currency } from '__generated__/graphql';
import { Input } from 'components/atoms';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { FormField } from '../FormField';

interface ITransactionCostFieldProps {
  activeCurrency: Currency;
}

export const TransactionCostField: FC<ITransactionCostFieldProps> = ({ activeCurrency }) => {
  const { t } = useTranslation();

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.transaction_cost')}
      htmlFor="transaction_cost"
    >
      <Input
        id="transaction_cost"
        type="currency"
        flexGrow={1}
        placeholder={t('modal.InvestFunds.form.input.transaction_cost.placeholder')}
        currency={activeCurrency}
      />
    </FormField>
  );
};
