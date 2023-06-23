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
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { FormField } from '../FormField';

interface IPriceFieldProps {
  activeCurrency: Currency;
}

export const PriceField: FC<IPriceFieldProps> = ({ activeCurrency }) => {
  const { t } = useTranslation();

  const { setValue, watch, register } = useFormContext<InvestFundsFormValues>();

  const [getInstrumentHistory] = useLazyQuery<
    GetInstrumentHistoryQuery,
    GetInstrumentHistoryQueryVariables
  >(INSTRUMENT_HISTORY, {
    onCompleted: ({ instrumentHistory }) => {
      setValue('price', String(instrumentHistory.at(-1)?.close.toFixed(2)), {
        shouldDirty: true,
      });
    },
  });

  const watchInstrument = watch('instrument');
  const watchDate = watch('date');

  useUpdateEffect(() => {
    if (watchInstrument?.Code && watchDate) {
      const sevenDaysAgo: Date = new Date(watchDate.getTime() - 7 * 24 * 60 * 60 * 1000);

      getInstrumentHistory({
        variables: {
          data: {
            code: watchInstrument.Code,
            exchange: watchInstrument.Exchange,
            from: sevenDaysAgo.toISOString(),
            to: watchDate.toISOString(),
            period: '1d',
          },
        },
      });
    }
  }, [watchInstrument, getInstrumentHistory, watchDate]);

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
