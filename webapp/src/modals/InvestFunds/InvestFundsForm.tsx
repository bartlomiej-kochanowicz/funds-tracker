import { Button, Datepicker, Spacer, Spreader } from 'components/atoms';
import { useDatepickerForm } from 'components/atoms/Datepicker';
import { SearchInstruments, useSearchInstrumentsForm } from 'components/molecules';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { useForm } from 'react-hook-form';

import { Form } from './InvestFundsForm.style';

export const InvestFundsForm = () => {
  const isTablet = useBreakpoint('phone', 'max');

  const defaultValues = {
    instrument: '',
    date: new Date(),
  };

  const { setValue, control, handleSubmit } = useForm<typeof defaultValues>({
    defaultValues,
  });

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

  const onSubmit = (data: typeof defaultValues) => {
    console.log(data);
  };

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

      <Button type="submit">test</Button>
    </Form>
  );
};
