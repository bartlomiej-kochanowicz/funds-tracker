import { Datepicker, Spacer, Spreader } from 'components/atoms';
import { useDatepickerForm } from 'components/atoms/Datepicker';
import { SearchInstruments } from 'components/molecules';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { useForm } from 'react-hook-form';

import { Form } from './InvestFundsForm.style';

type InvestFundsFormValues = {
  instrument: string;
  date: Date | null;
};

export const InvestFundsForm = () => {
  const isTablet = useBreakpoint('tablet', 'max');

  const defaultValues = {
    instrument: '',
    date: new Date(),
  };

  const { setValue, control } = useForm<InvestFundsFormValues>({
    defaultValues,
  });

  const datepickerProps = useDatepickerForm({
    control,
    name: 'date',
    setValue,
  });

  return (
    <Form>
      <SearchInstruments
        onChange={e => console.log(e)}
        width="100%"
      />

      {isTablet ? <Spacer space="0.25" /> : <Spreader spread="0.25" />}

      <Datepicker {...datepickerProps} />
    </Form>
  );
};
