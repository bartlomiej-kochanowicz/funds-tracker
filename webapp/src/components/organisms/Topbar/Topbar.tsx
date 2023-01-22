import { lazy, Suspense } from 'react';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { Profile } from 'components/molecules';
import { StyledRow } from './Topbar.styles';

const LogoNameVertical = lazy(() =>
  import('assets/logo/logo-name-vertical.svg').then(({ ReactComponent: component }) => ({
    default: component,
  })),
);

const LogoNameVerticalDark = lazy(() =>
  import('assets/logo/logo-name-vertical-dark.svg').then(({ ReactComponent: component }) => ({
    default: component,
  })),
);

export const Topbar = () => {
  const { isDark } = useColorThemeContext();

  return (
    <StyledRow justifyContent="space-between">
      <Suspense>
        {isDark ? <LogoNameVertical width="135px" /> : <LogoNameVerticalDark width="135px" />}
      </Suspense>

      <Profile withName />
    </StyledRow>
  );
};
