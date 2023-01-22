import { useBreakpoint } from 'hooks/useBreakpoint';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { Column } from 'simple-flexbox';
import { Header } from './components/Header';

export const Hub = () => {
  const isDesktop = useBreakpoint('desktop', 'min');

  if (isDesktop) {
    return (
      <Navigate
        to={ROUTES.DASHBOARD.HOME}
        replace
      />
    );
  }

  return (
    <Column>
      <Header />
    </Column>
  );
};

Hub.displayName = 'Hub';
