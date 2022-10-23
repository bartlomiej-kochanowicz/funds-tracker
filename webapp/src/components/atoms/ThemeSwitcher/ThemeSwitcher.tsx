import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { Handle, spring, StyledBiMoon, StyledBiSun, StyledButton } from './ThemeSwitcher.styles';

export const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useColorThemeContext();

  return (
    <StyledButton
      onClick={toggleTheme}
      type="button"
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
