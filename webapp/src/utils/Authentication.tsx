import { useSelector, useDispatch } from 'react-redux';
import jwtDecode, { JwtPayload } from 'jwt-decode';
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

  const { status, data } = useSelector(selectAuth);

  const { loading, loaded, rejected } = useStatus(status);

  /* if (loaded && !rejected) {
    const { exp } = jwtDecode<JwtPayload>(data.accessToken);

    if (exp && Date.now() >= exp * 1000)
      dispatch(refreshThunk({ refreshToken: data.refreshToken }));
  }
 */
  return loading ? (
    <FullscreenClear>
      <Loader />
    </FullscreenClear>
  ) : (
    children
  );
};
