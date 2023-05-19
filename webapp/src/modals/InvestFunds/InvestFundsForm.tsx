import { Datepicker, Spreader } from 'components/atoms';
import { SearchInstruments } from 'components/molecules';
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

  const { getValues, setValue } = useForm<InvestFundsFormValues>({
    defaultValues,
  });

  const selectedDate = getValues('date');

  return (
    <form>
      <Row>
        <SearchInstruments onChange={({ symbol }) => setValue('instrument', symbol)} />

        <Spreader spread="0.25" />

        <Datepicker
          selected={selectedDate}
          onChange={date => setValue('date', date)}
          inputProps={{
            width: 'auto',
          }}
        />
      </Row>
    </form>
  );
};
