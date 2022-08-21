import { FullscreenClear } from 'layouts/FullscreenClear';
import { Button, Spacer, Text } from 'components/atoms';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import { useSelector } from 'react-redux';
import { selectAuth } from 'store/selectors/auth';

export const Dashboard = () => {
  const { data } = useSelector(selectAuth);

  return (
    <FullscreenClear>
      <Text>You are signin as:{data.email}</Text>

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
};
