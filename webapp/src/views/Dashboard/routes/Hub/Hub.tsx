import { Heading } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';

import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { Column } from 'simple-flexbox';

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
      <Heading level="h3">test</Heading>
    </Column>
  );
};

Hub.displayName = 'Hub';
