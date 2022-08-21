import { useSelector, useDispatch } from 'react-redux';
import { getAccessToken, getRefreshToken } from 'helpers/accessTokens';
import { useStatus } from 'hooks/useStatus';
import { selectAuth } from 'store/selectors/auth';
import { refreshThunk } from 'store/thunks/auth/refreshThunk';
import { AppDispatch } from 'store';
import { Loader } from 'components/atoms';
import { FullscreenClear } from 'layouts/FullscreenClear';

interface AuthenticationProps {
  children: JSX.Element | null;
}

export const Authentication = ({ children }: AuthenticationProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { status } = useSelector(selectAuth);

  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  const { loading, loaded } = useStatus(status);

  if (!loaded && accessToken && refreshToken) {
    dispatch(refreshThunk({ refreshToken }));
  }

  return loading ? (
    <FullscreenClear>
      <Loader />
    </FullscreenClear>
  ) : (
    children
  );
};
