import { FC, Fragment, lazy, useCallback, useEffect, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { Profile } from 'components/molecules';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { Colors } from 'styles/theme';
import { Wrapper } from './MobileTopbar.styles';

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
  isHub: boolean;
}

export const MobileTopbar: FC<MobileTopbarProps> = ({ isHub }) => {
  const { isDark } = useColorThemeContext();

  const [visible, setVisible] = useState(window.pageYOffset !== 0);

  const onScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <Wrapper
      justifyContent={isHub ? 'space-between' : 'center'}
      alignItems="center"
      hasBackground={visible}
    >
      {!isHub && (
        <Fragment>
          {isDark && <LogoNameHorizontal height="18px" />}

          {!isDark && <LogoNameHorizontalDark height="18px" />}
        </Fragment>
      )}

      {isHub && (
        <Fragment>
          <FaCog
            size="1.5rem"
            color={isDark ? Colors.Gray200 : Colors.Gray400}
          />

          <Profile />
        </Fragment>
      )}
    </Wrapper>
  );
};

MobileTopbar.displayName = 'MobileTopbar';
