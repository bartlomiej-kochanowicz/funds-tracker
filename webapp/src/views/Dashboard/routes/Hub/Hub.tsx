import { useBreakpoint } from 'hooks/useBreakpoint';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { Column } from 'simple-flexbox';
import { Profile } from './components/Profile';

const HubContent = () => (
  <Column>
    <Profile />
  </Column>
);

export const Hub = () => {
  const isDesktop = useBreakpoint('desktop', 'min');

  return isDesktop ? (
    <Navigate
      to={ROUTES.DASHBOARD.HOME}
      replace
    />
  ) : (
    <HubContent />
  );
};

Hub.displayName = 'Hub';
