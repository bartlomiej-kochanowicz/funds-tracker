import { Datepicker, Spacer, Spreader } from 'components/atoms';
import { useDatepickerForm } from 'components/atoms/Datepicker';
import { SearchInstruments, useSearchInstrumentsForm } from 'components/molecules';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { InstrumentDetails } from './components/InstrumentDetails';
import { Form } from './InvestFundsForm.style';

export const InvestFundsForm = () => {
  const isTablet = useBreakpoint('phone', 'max');

  const defaultValues = {
    instrument: '',
    date: new Date(),
  };

  const { setValue, control, handleSubmit, watch } = useForm<typeof defaultValues>({
    defaultValues,
  });

  const watchInstrument = watch('instrument');
  const watchDate = watch('date');

  const onSubmit = useCallback((data: typeof defaultValues) => {
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

  return (
    <Form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <SearchInstruments
        {...searchInstrumentsProps}
        width="100%"
      />

      {isTablet ? <Spacer space="0.25" /> : <Spreader spread="0.25" />}

      <Datepicker {...datepickerProps} />

      <Spacer space="0.25" />

      <InstrumentDetails
        instrument={watchInstrument}
        date={watchDate}
      />
    </Form>
  );
};
