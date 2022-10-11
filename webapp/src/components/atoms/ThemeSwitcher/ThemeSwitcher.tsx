import { COLOR_THEME } from 'constants/common';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { Handle, spring, StyledBiMoon, StyledBiSun, StyledButton } from './ThemeSwitcher.styles';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useColorThemeContext();

  const isDark = theme.colorTheme === COLOR_THEME.DARK;

  return (
    <StyledButton
      isDark={isDark}
      onClick={toggleTheme}
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
