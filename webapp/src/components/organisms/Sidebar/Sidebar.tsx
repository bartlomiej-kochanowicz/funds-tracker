import { lazy, Suspense } from 'react';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { Heading, Spacer, ThemeSwitcher } from 'components/atoms';
import { LangSelector } from 'components/molecules';
import { useTranslation } from 'react-i18next';
import { Column } from 'simple-flexbox';
import { NavList } from './components/NavList';
import { sidebarNavigation } from './constants';
import { StyledColumn } from './Sidebar.styles';
import { LogoFallback } from './components/LogoFallback';

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

export const Sidebar = () => {
  const { t } = useTranslation();

  const { isDark } = useColorThemeContext();

  return (
    <StyledColumn justifyContent="space-between">
      <Column>
        <Suspense fallback={<LogoFallback />}>
          {isDark ? (
            <LogoNameVertical
              height="35px"
              style={{
                width: 'fit-content',
              }}
            />
          ) : (
            <LogoNameVerticalDark
              height="35px"
              style={{
                width: 'fit-content',
              }}
            />
          )}
        </Suspense>

        <Spacer space="large" />

        <Spacer />

        <Heading
          level="h2"
          fontSize="1.25"
        >
          {t('common.dashboard')}
        </Heading>

        <Spacer space="small" />

        <NavList navigation={sidebarNavigation} />
      </Column>

      <Column alignItems="center">
        <ThemeSwitcher />

        <Spacer />

        <LangSelector />
      </Column>
    </StyledColumn>
  );
};
