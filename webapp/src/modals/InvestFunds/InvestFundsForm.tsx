import { Datepicker, Spreader } from 'components/atoms';
import { useDatepickerForm } from 'components/atoms/Datepicker';
import { SearchInstruments } from 'components/molecules';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Row } from 'simple-flexbox';

type InvestFundsFormValues = {
  instrument: string;
  date: Date | null;
};

export const InvestFundsForm = () => {
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
    <form>
      <Row>
        <SearchInstruments
          onChange={e => console.log(e)}
          width="100%"
        />

        <Spreader spread="0.25" />

        <Datepicker {...datepickerProps} />
      </Row>
    </form>
  );
};
