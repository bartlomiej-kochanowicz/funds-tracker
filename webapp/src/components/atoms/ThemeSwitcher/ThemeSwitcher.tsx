import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Handle, spring, StyledBiMoon, StyledBiSun, StyledButton } from './ThemeSwitcher.styles';

export const ThemeSwitcher = forwardRef<HTMLButtonElement>((props, ref) => {
  const { t } = useTranslation();

  const { isDark, toggleTheme } = useColorThemeContext();

  return (
    <StyledButton
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-label={t('common.theme_switcher')}
      aria-checked={isDark}
      ref={ref}
      {...props}
    >
      <StyledBiMoon $isVisible={isDark} />

      <Handle
        transition={spring}
        initial={{ x: isDark ? 30 : 0 }}
        animate={{ x: isDark ? 30 : 0 }}
      />

      <StyledBiSun isVisible={!isDark} />
    </StyledButton>
  );
});

ThemeSwitcher.displayName = 'ThemeSwitcher';
