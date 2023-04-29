import { Button, Datepicker, Spacer, Toggle } from 'components/atoms';
import { SearchInstruments } from 'components/molecules';
import { useState } from 'react';
import { Column } from 'simple-flexbox';

export const Dashboard = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  return (
    <Column>
      <Toggle />

      <Spacer />

      <Button>test</Button>

      <Spacer />

      <Button outline>test</Button>

      <Spacer />

      <Button color="secondary">test</Button>

      <Spacer />

      <Button
        color="secondary"
        outline
      >
        test
      </Button>

      <Spacer />

      <SearchInstruments
        onChange={e => {
          console.log(e);
        }}
      />

      <Spacer />

      <Datepicker
        selected={startDate}
        onChange={date => setStartDate(date)}
      />
    </Column>
  );
};
