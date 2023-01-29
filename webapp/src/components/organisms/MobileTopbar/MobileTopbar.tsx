import { FC, Fragment, lazy, useCallback, useEffect, useState } from 'react';
import { Profile } from 'components/molecules';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { debounce } from 'helpers/debounce';
import { Column } from 'simple-flexbox';
import { Spacer } from 'components/atoms';
import { Wrapper } from './MobileTopbar.styles';
import { SettingsDropdown } from './components/SettingsDropdown';

const LogoNameHorizontal = lazy(() =>
  import('assets/logo/logo-name-horizontal.svg').then(({ ReactComponent: component }) => ({
    default: component,
  })),
);

const LogoNameHorizontalDark = lazy(() =>
  import('assets/logo/logo-name-horizontal-dark.svg').then(({ ReactComponent: component }) => ({
    default: component,
  })),
);

interface MobileTopbarProps {
  isDashboard: boolean;
}

export const MobileTopbar: FC<MobileTopbarProps> = ({ isDashboard }) => {
  const { isDark } = useColorThemeContext();

  const [visible, setVisible] = useState(window.pageYOffset !== 0);

  const onScroll = debounce(
    useCallback(() => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }, []),
    100,
  );

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <Wrapper
      justifyContent={isDashboard ? 'center' : 'space-between'}
      alignItems="center"
      hasBorder={visible}
    >
      {isDashboard && (
        <Column>
          <Spacer space="tiny" />
          {isDark && <LogoNameHorizontal height="18px" />}

          {!isDark && <LogoNameHorizontalDark height="18px" />}
          <Spacer space="tiny" />
        </Column>
      )}

      {!isDashboard && (
        <Fragment>
          <SettingsDropdown />

          <Profile />
        </Fragment>
      )}
    </Wrapper>
  );
};

MobileTopbar.displayName = 'MobileTopbar';
