import { COLOR_THEME, ColorThemeType } from 'constants/common';
import { getLocalColorTheme, setLocalColorTheme } from 'helpers/localColorTheme';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import { createContext, FC, useContext, useState } from 'react';
import { darkTheme, theme } from 'styles/theme';

type ColorThemeContextType = ReturnType<typeof useColorTheme>;

const ColorThemeContext = createContext<ColorThemeContextType | null>(null);

const useColorTheme = () => {
  const localTheme = getLocalColorTheme();

  const [colorTheme, setColorTheme] = useState<ColorThemeType>(localTheme || COLOR_THEME.LIGHT);

  const toggleTheme = () =>
    setColorTheme(prevTheme =>
      prevTheme === COLOR_THEME.LIGHT ? COLOR_THEME.DARK : COLOR_THEME.LIGHT,
    );

  useUpdateEffect(() => {
    setLocalColorTheme(colorTheme);
  }, [colorTheme]);

  return {
    theme: colorTheme === COLOR_THEME.LIGHT ? theme : darkTheme,
    isDark: colorTheme === COLOR_THEME.DARK,
    toggleTheme,
  };
};

type ProviderProps = {
  children: React.ReactNode;
};

export const ColorThemeProvider: FC<ProviderProps> = ({ children }) => {
  const value = useColorTheme();

  return <ColorThemeContext.Provider value={value}>{children}</ColorThemeContext.Provider>;
};

export const useColorThemeContext = () => {
  const value = useContext(ColorThemeContext);

  if (!value) {
    throw new Error('useColorThemeContext must be used inside ColorThemeProvider');
  }

  return value;
};
