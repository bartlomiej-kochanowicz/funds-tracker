import { FullscreenClear } from 'layouts/FullscreenClear';
import { Button, Spacer, Text } from 'components/atoms';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccount } from 'store/selectors/account';
import { AppDispatch } from 'store';
import { logoutThunk } from 'store/thunks/account/logoutThunk';

export const Dashboard = () => {
  const { data } = useSelector(selectAccount);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => dispatch(logoutThunk());

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

      <Spacer />

      <Button
        onClick={handleLogout}
        color="black"
      >
        Logout
      </Button>
    </FullscreenClear>
  );
};
