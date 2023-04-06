import { Button, Spacer, Toggle } from 'components/atoms';
import { SearchInstruments } from 'components/molecules';
import { Column } from 'simple-flexbox';

export const Dashboard = () => (
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
  </Column>
);
