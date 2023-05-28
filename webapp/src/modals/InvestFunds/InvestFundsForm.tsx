import {
  Currency,
  GetInstrumentHistoryQuery,
  GetInstrumentHistoryQueryVariables,
} from '__generated__/graphql';
import { useLazyQuery } from '@apollo/client';
import { Box, Input, Spacer, Text } from 'components/atoms';
import { INSTRUMENT_HISTORY } from 'graphql/query/instruments/InstrumentHistory';
import { formatCurrency } from 'helpers/formatCurrency';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import { FC, useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { ComissionField } from './components/ComissionField';
import { DateField } from './components/DateField';
import { FormField } from './components/FormField';
import { PriceField } from './components/PriceField';
import { QuantityField } from './components/QuantityField';
import { SearchInstrumentField } from './components/SearchInstrumentField';
import { SelectPortfolioField } from './components/SelectPortfolioField';
import { TransactionCostField } from './components/TransactionCostField';
import { defaultValues, InvestFundsFormValues } from './helpers/defaultValues';

interface InvestFundsFormProps {
  balance: number;
  currency: Currency;
  uuid: string;
}

export const InvestFundsForm: FC<InvestFundsFormProps> = ({ balance, currency, uuid }) => {
  const { t } = useTranslation();

  /* const [getInstrumentHisotry, { data: history }] = useLazyQuery<
    GetInstrumentHistoryQuery,
    GetInstrumentHistoryQueryVariables
  >(INSTRUMENT_HISTORY); */

  const methods = useForm<InvestFundsFormValues>({
    defaultValues,
  });

  const { handleSubmit, watch } = methods;

  const watchInstrument = watch('instrument');
  const watchDate = watch('date');

  /* useUpdateEffect(() => {
    if (watchInstrument?.Code) {
      getInstrumentHisotry({
        variables: {
          data: {
            code: watchInstrument.Code,
            exchange: watchInstrument.Exchange,
            from: watchDate.toISOString(),
            to: watchDate.toISOString(),
            period: '1d',
          },
        },
      });
    }
  }, [watchInstrument, getInstrumentHisotry, watchDate]); */

  /* useUpdateEffect(() => {
    if (watchInstrument?.Code && !history?.instrumentHistory.length) {
      setValue('quantity', 2137, { shouldDirty: true });
    }
  }, [watchInstrument, history]); */

  const onSubmit = useCallback(
    (data: InvestFundsFormValues) => {
      console.log({ ...data, uuid });
    },
    [uuid],
  );

  const activeCurrency = watchInstrument?.Currency || currency;

  return (
    <FormProvider {...methods}>
      <Box
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        flex
        flexDirection="column"
      >
        <FormField
          label={t('modal.InvestFunds.form.label.account.balance')}
          htmlFor="balance"
        >
          <Text>{formatCurrency(balance, currency)}</Text>
        </FormField>

        <Spacer space="0.25" />

        <SearchInstrumentField />

        <Spacer space="0.25" />

        <SelectPortfolioField />

        <Spacer space="0.25" />

        <DateField />

        <Spacer space="0.25" />

        <QuantityField />

        <Spacer space="0.25" />

        <PriceField activeCurrency={activeCurrency as Currency} />

        <Spacer space="0.25" />

        <ComissionField activeCurrency={activeCurrency as Currency} />

        <Spacer space="0.25" />

        <TransactionCostField activeCurrency={activeCurrency as Currency} />
      </Box>
    </FormProvider>
  );
};
