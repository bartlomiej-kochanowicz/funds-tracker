import { Column } from 'simple-flexbox';
import { Button, Spacer, Toggle } from 'components/atoms';

export const Dashboard = () => (
  <Column>
    <Toggle />

    <Spacer />

    <Button
      color="black"
      size="large"
    >
      test
    </Button>
  </Column>
);
