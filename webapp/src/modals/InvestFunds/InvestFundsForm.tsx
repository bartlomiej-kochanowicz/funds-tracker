import { Currency, GetPortfoliosQuery, SearchInstrumentsQuery } from '__generated__/graphql';
import { useQuery } from '@apollo/client';
import { Box, Datepicker, Input, Loader, Select, Spacer, Text } from 'components/atoms';
import { useDatepickerForm } from 'components/atoms/Datepicker';
import { SearchInstruments, useSearchInstrumentsForm } from 'components/molecules';
import { GET_PORTFOLIOS } from 'graphql/query/portfolios/GetPortfolios';
import { formatCurrency } from 'helpers/formatCurrency';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField } from './components/FormField';

type InvestFundsFormValues = {
  instrument: SearchInstrumentsQuery['searchInstruments'][0];
  date: Date;
};

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
    date: new Date(),
  };

  const { setValue, control, handleSubmit } = useForm<InvestFundsFormValues>({
    defaultValues,
  });

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
          placeholder="Wybierz portfel"
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
          type="number"
          flexGrow={1}
        />
      </FormField>
    </Box>
  );
};
