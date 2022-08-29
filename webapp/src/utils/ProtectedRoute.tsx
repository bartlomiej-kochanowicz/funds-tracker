import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes';
import { useSelector, useDispatch } from 'react-redux';
import { selectAccount } from 'store/selectors/account';
import { STATUS } from 'constants/store';
import { isUserLoggedIn } from 'helpers/isUserLoggedIn';
import { useStatus } from 'hooks/useStatus';
import { AppDispatch } from 'store';
import { accountThunk } from 'store/thunks/account/accountThunk';
import { Loader } from 'components/atoms';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { logoutThunk } from 'store/thunks/account/logoutThunk';

interface ProtectedRouteProps {
  children: JSX.Element;
  to?: string;
  reverse?: boolean;
}

export const ProtectedRoute = ({
  children,
  to = ROUTES.SIGNIN,
  reverse = false,
}: ProtectedRouteProps) => {
  const { status } = useSelector(selectAccount);

  const dispatch = useDispatch<AppDispatch>();

  const { loaded, loading } = useStatus(status);

  const isAuthenticated = status === STATUS.fulfilled || isUserLoggedIn;

  if (isUserLoggedIn && !loaded && !loading) {
    dispatch(accountThunk());

    return (
      <FullscreenClear>
        <Loader />
      </FullscreenClear>
    );
  }

  if (reverse) return isAuthenticated ? <Navigate to={to} /> : children;

  return isAuthenticated ? children : <Navigate to={to} />;
};

ProtectedRoute.displayName = 'ProtectedRoute';

ProtectedRoute.defaultProps = {
  to: ROUTES.SIGNIN,
  reverse: false,
};
