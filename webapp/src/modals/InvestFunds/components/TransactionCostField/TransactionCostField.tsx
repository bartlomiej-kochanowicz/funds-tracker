import { Currency } from '__generated__/graphql';
import { Button, Icon, Input, Spreader } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import { InvestFundsFormValues } from 'modals/InvestFunds/helpers/defaultValues';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaCalculator } from 'react-icons/fa';
import { Row } from 'simple-flexbox';

import { FormField } from '../FormField';

interface ITransactionCostFieldProps {
  activeCurrency: Currency;
}

export const TransactionCostField: FC<ITransactionCostFieldProps> = ({ activeCurrency }) => {
  const { t } = useTranslation();

  const { register, getFieldState, getValues, setValue } = useFormContext<InvestFundsFormValues>();

  const isPhone = useBreakpoint('phone', 'max');

  const { error } = getFieldState('transaction_cost');

  const calculateTransactionCost = () => {
    const { price, quantity, comission, comission_type: comissionType } = getValues();

    if (!price || !quantity || !comission || !comissionType) return;

    let transactionCost = 0;

    if (comissionType === 'amount') {
      transactionCost = Number(price) * Number(quantity) + Number(comission);
    }

    if (comissionType === '%') {
      transactionCost =
        Number(price) * Number(quantity) +
        (Number(price) * Number(quantity) * Number(comission)) / 100;
    }

    setValue('transaction_cost', String(transactionCost.toFixed(2)), {
      shouldDirty: true,
    });
  };

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.transaction_cost')}
      htmlFor="transaction_cost"
    >
      <Row flexGrow={1}>
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

        <Spreader spread="0.25" />

        <Button
          color="secondary"
          onClick={calculateTransactionCost}
        >
          <Icon icon={FaCalculator} />
        </Button>
      </Row>
    </FormField>
  );
};
