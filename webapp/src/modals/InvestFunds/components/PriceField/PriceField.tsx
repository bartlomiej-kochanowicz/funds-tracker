import {
  Currency,
  GetInstrumentHistoryQuery,
  GetInstrumentHistoryQueryVariables,
} from '__generated__/graphql';
import { useLazyQuery } from '@apollo/client';
import { Input } from 'components/atoms';
import { INSTRUMENT_HISTORY } from 'graphql/query/instruments/InstrumentHistory';
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
    if (watchInstrument?.Code && !data?.instrumentHistory.length) {
      setValue('price', watchInstrument.previousClose, { shouldDirty: true });
    }

    if (watchInstrument?.Code && data?.instrumentHistory.length) {
      setValue('price', data.instrumentHistory[0].close, { shouldDirty: true });
    }
  }, [watchInstrument, data]);

  return (
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
        {...register('price')}
      />
    </FormField>
  );
};
