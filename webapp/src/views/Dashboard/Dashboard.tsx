import { FullscreenClear } from 'layouts/FullscreenClear';
import { Button, Spacer } from 'components/atoms';
import { Link } from 'react-router-dom';
import { ROUTES } from 'ROUTES';

export const Dashboard = () => (
  <FullscreenClear
    alignItems="center"
    justifyContent="center"
  >
    <Button
      as={Link}
      to={ROUTES.MODEL_PORTFOLIO}
    >
      Go to model portfolio
    </Button>

    <Spacer />

    <Button
      as={Link}
      to={ROUTES.ACTUAL_PORTFOLIO}
    >
      Go to actual portfolio
    </Button>
  </FullscreenClear>
);
