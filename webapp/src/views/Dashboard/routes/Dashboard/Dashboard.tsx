import { Button, Text } from 'components/atoms';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccount } from 'store/selectors/account';
import { AppDispatch } from 'store';
import { logoutThunk } from 'store/thunks/account/logoutThunk';
import { Column } from 'simple-flexbox';

export const Dashboard = () => {
  const { data } = useSelector(selectAccount);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => dispatch(logoutThunk());

  return (
    <Column>
      <Text>You are signin as:{data.email}</Text>

      <Button
        onClick={handleLogout}
        color="black"
      >
        Logout
      </Button>
    </Column>
  );
};
