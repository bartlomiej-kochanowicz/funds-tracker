import { Button, Spacer, Toggle } from 'components/atoms';
import { Column } from 'simple-flexbox';

export const Dashboard = () => (
  <Column>
    <Toggle />

    <Spacer />

    <Button
      color="secondary"
      size="large"
    >
      test
    </Button>
  </Column>
);
