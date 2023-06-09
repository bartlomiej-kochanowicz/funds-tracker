import {
  Currency,
  GetInstrumentHistoryQuery,
  GetInstrumentHistoryQueryVariables,
} from '__generated__/graphql';
import { useLazyQuery } from '@apollo/client';
import { Input } from 'components/atoms';
import { INSTRUMENT_HISTORY } from 'graphql/query/instruments/InstrumentHistory';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import { InvestFundsFormValues } from 'modals/InvestFunds/helpers/defaultValues';
import { FC } from 'react';
import { formatValue } from 'react-currency-input-field';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField } from '../FormField';

interface IPriceFieldProps {
  activeCurrency: Currency;
}

export const PriceField: FC<IPriceFieldProps> = ({ activeCurrency }) => {
  const { t, i18n } = useTranslation();

  const [getInstrumentHistory, { data }] = useLazyQuery<
    GetInstrumentHistoryQuery,
    GetInstrumentHistoryQueryVariables
  >(INSTRUMENT_HISTORY);

  const { setValue, watch, register } = useFormContext<InvestFundsFormValues>();

  const watchInstrument = watch('instrument');
  const watchDate = watch('date');

  useUpdateEffect(() => {
    if (watchInstrument?.Code) {
      getInstrumentHistory({
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
  }, [watchInstrument, getInstrumentHistory, watchDate]);

  useUpdateEffect(() => {
    const intlConfig = { locale: i18n.language, currency: activeCurrency };

    if (watchInstrument?.Code && !data?.instrumentHistory.length) {
      setValue(
        'price',
        formatValue({ value: String(watchInstrument.previousClose.toFixed(2)), intlConfig }),
        {
          shouldDirty: true,
        },
      );
    }

    if (watchInstrument?.Code && data?.instrumentHistory.length) {
      setValue(
        'price',
        formatValue({ value: String(data.instrumentHistory[0].close.toFixed(2)), intlConfig }),
        {
          shouldDirty: true,
        },
      );
    }
  }, [watchInstrument, data]);

  const isPhone = useBreakpoint('phone', 'max');

  return (
    <FormField
      label={t('modal.InvestFunds.form.label.price')}
      htmlFor="price"
    >
      <Input
        id="price"
        type="currency"
        flexGrow={1}
        width={isPhone ? '100%' : 'auto'}
        placeholder={t('modal.InvestFunds.form.input.price.placeholder')}
        currency={activeCurrency}
        {...register('price')}
      />
    </FormField>
  );
};