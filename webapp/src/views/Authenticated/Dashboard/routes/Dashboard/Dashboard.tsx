import { Button, Spacer, Toggle } from 'components/atoms';
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
  </Column>
);
