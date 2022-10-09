import { useBreakpoint } from 'hooks/useBreakpoint';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';

export const Hub = () => {
  const isDesktop = useBreakpoint('desktop', 'min');

  return isDesktop ? (
    <Navigate
      to={ROUTES.DASHBOARD.HOME}
      replace
    />
  ) : (
    <div>Hub</div>
  );
};
