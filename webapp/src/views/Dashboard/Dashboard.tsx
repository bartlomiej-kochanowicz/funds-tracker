import { FullscreenClear } from 'layouts/FullscreenClear';
import { Button, Spacer } from 'components/atoms';

export const Dashboard = () => (
  <FullscreenClear
    alignItems="center"
    justifyContent="center"
  >
    <Button>Go to model portfolio</Button>

    <Spacer />

    <Button>Go to actual portfolio</Button>
  </FullscreenClear>
);
