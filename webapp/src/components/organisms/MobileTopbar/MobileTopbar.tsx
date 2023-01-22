import { FC, Fragment, lazy } from 'react';
import { FaCog } from 'react-icons/fa';
import { Profile } from 'components/molecules';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
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

  return (
    <Wrapper
      justifyContent={isHub ? 'space-between' : 'center'}
      alignItems="center"
    >
      {!isHub && (
        <Fragment>
          {isDark && <LogoNameHorizontal height="22px" />}

          {!isDark && <LogoNameHorizontalDark height="22px" />}
        </Fragment>
      )}

      {isHub && (
        <Fragment>
          <FaCog size="1.5rem" />

          <Profile />
        </Fragment>
      )}
    </Wrapper>
  );
};

MobileTopbar.displayName = 'MobileTopbar';
