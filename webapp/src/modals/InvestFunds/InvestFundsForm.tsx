import { Currency, GetPortfoliosQuery, SearchInstrumentsQuery } from '__generated__/graphql';
import { useQuery } from '@apollo/client';
import { Box, Datepicker, Input, Loader, Select, Spacer, Spreader, Text } from 'components/atoms';
import { useDatepickerForm } from 'components/atoms/Datepicker';
import { SearchInstruments, useSearchInstrumentsForm } from 'components/molecules';
import { GET_PORTFOLIOS } from 'graphql/query/portfolios/GetPortfolios';
import { formatCurrency } from 'helpers/formatCurrency';
import { useSelect } from 'hooks/useSelect';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField } from './components/FormField';

interface InvestFundsFormProps {
  balance: number;
  currency: Currency;
  uuid: string;
}

export const InvestFundsForm: FC<InvestFundsFormProps> = ({ balance, currency, uuid }) => {
  const { t } = useTranslation();

  const { loading, data: portfolios } = useQuery<GetPortfoliosQuery>(GET_PORTFOLIOS);

  const selectPortfolioItems =
    portfolios?.portfolios.map(portfolio => ({
      label: portfolio.name,
      value: portfolio.uuid,
    })) || [];

  const defaultValues = {
    instrument: {
      Code: '',
      Exchange: '',
      Name: '',
      Type: '',
      Country: '',
      Currency: '',
      ISIN: null,
      previousClose: 0,
    },
    portfolio: '',
    date: new Date(),
    quantity: 0,
    price: 0,
    commission: 0,
    commission_type: '%',
    transaction_cost: 0,
  };

  type InvestFundsFormValues = typeof defaultValues;

  const {
    setValue,
    control,
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm<InvestFundsFormValues>({
    defaultValues,
  });

  const watchInstrument = watch('instrument');

  const onSubmit = useCallback((data: InvestFundsFormValues) => {
    console.log(data);
  }, []);

  const searchInstrumentsProps = useSearchInstrumentsForm({
    control,
    name: 'instrument',
    setValue,
  });

  const datepickerProps = useDatepickerForm({
    control,
    name: 'date',
    setValue,
  });

  const comissionTypeProps = useSelect<InvestFundsFormValues>({
    register,
    name: 'commission_type',
    errors,
  });

  const watchCommissionType = watch('commission_type');

  const activeCurrency = watchInstrument?.Currency || currency;

  const selectCommisionType = [
    {
      label: '%',
      value: '%',
    },
    {
      label: t('common.value'),
      value: 'value',
    },
  ];

  if (loading) {
    return <Loader />;
  }

  return (
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

      <FormField
        label={t('modal.InvestFunds.form.label.instrument')}
        htmlFor="instrument"
      >
        <SearchInstruments
          {...searchInstrumentsProps}
          id="instrument"
          flexGrow={1}
        />
      </FormField>

      <Spacer space="0.25" />

      <FormField
        label={t('modal.InvestFunds.form.label.portfolio')}
        htmlFor="portfolio"
      >
        <Select
          items={selectPortfolioItems}
          placeholder={t('modal.InvestFunds.form.select.portfolio.placeholder')}
          flexGrow={1}
        />
      </FormField>

      <Spacer space="0.25" />

      <FormField
        label={t('modal.InvestFunds.form.label.purchase_date')}
        htmlFor="date"
      >
        <Datepicker {...datepickerProps} />
      </FormField>

      <Spacer space="0.25" />

      <FormField
        label={t('modal.InvestFunds.form.label.quantity')}
        htmlFor="quantity"
      >
        <Input
          id="quantity"
          type="number"
          flexGrow={1}
          placeholder={t('modal.InvestFunds.form.input.quantity.placeholder')}
        />
      </FormField>

      <Spacer space="0.25" />

      <FormField
        label={t('modal.InvestFunds.form.label.price')}
        htmlFor="price"
      >
        <Input
          id="price"
          type="number"
          flexGrow={1}
          placeholder={t('modal.InvestFunds.form.input.price.placeholder')}
          unit={activeCurrency}
        />
      </FormField>

      <Spacer space="0.25" />

      <FormField
        label={t('modal.InvestFunds.form.label.commission', {
          currency: activeCurrency,
        })}
        htmlFor="commission"
      >
        <Input
          id="commission"
          type="number"
          flexGrow={1}
          unit={watchCommissionType === '%' ? '%' : activeCurrency}
          placeholder={t('modal.InvestFunds.form.input.commission.placeholder')}
        />

        <Spreader spread="0.25" />

        <Select
          items={selectCommisionType}
          defaultValue={defaultValues.commission_type}
          {...comissionTypeProps}
        />
      </FormField>

      <Spacer space="0.25" />

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
        />
      </FormField>
    </Box>
  );
};
