import { useSelector, useDispatch } from 'react-redux';
import { useStatus } from 'hooks/useStatus';
import { selectAccount } from 'store/selectors/account';
import { AppDispatch } from 'store';
import { Loader } from 'components/atoms';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { isUserLoggedIn } from 'helpers/isUserLoggedIn';
import { accountThunk } from 'store/thunks/account/accountThunk';

interface AuthenticationProps {
  children: JSX.Element | null;
}

export const Authentication = ({ children }: AuthenticationProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { status } = useSelector(selectAccount);

  const { loading, loaded } = useStatus(status);

  if (isUserLoggedIn && !loaded && !loading) {
    dispatch(accountThunk());
  }

  return loading ? (
    <FullscreenClear>
      <Loader />
    </FullscreenClear>
  ) : (
    children
  );
};
