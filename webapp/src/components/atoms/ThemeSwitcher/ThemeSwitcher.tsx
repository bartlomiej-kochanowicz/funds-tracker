import { useTranslation } from 'react-i18next';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { Handle, spring, StyledBiMoon, StyledBiSun, StyledButton } from './ThemeSwitcher.styles';

export const ThemeSwitcher = () => {
  const { t } = useTranslation();

  const { isDark, toggleTheme } = useColorThemeContext();

  return (
    <StyledButton
      onClick={toggleTheme}
      type="button"
      aria-label={t('common.theme_switcher')}
      tabIndex={0}
    >
      {isDark && <StyledBiMoon />}

      <Handle
        layout
        transition={spring}
      />

      {!isDark && <StyledBiSun />}
    </StyledButton>
  );
};

ThemeSwitcher.displayName = 'ThemeSwitcher';
