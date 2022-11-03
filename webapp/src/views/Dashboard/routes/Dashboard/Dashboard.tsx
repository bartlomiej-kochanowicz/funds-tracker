import { Column } from 'simple-flexbox';
import { Button, Spacer, Toggle } from 'components/atoms';
import { ErrorContent } from 'components/molecules';

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

    <ErrorContent />
  </Column>
);
