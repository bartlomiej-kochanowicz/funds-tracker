import { Currency } from '__generated__/graphql';
import { Box, Button, Loader, Spacer, Text } from 'components/atoms';
import { formatCurrency } from 'helpers/formatCurrency';
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

  const methods = useForm<InvestFundsFormValues>({
    defaultValues,
  });

  const {
    handleSubmit,
    watch,
    formState: { isValid, isSubmitting },
  } = methods;

  const watchInstrument = watch('instrument');

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

        <Spacer />

        <Button
          type="submit"
          width="100%"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting && <Loader size="small" />}

          {!isSubmitting && 'Invest 🎉'}
        </Button>
      </Box>
    </FormProvider>
  );
};
