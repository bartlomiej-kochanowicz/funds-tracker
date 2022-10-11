import { createContext, FC, useContext, useState } from 'react';
import { theme, darkTheme } from 'styles/theme';
import { COLOR_THEME, ColorThemeType } from 'constants/common';

type ColorThemeContextType = ReturnType<typeof useColorTheme>;

const ColorThemeContext = createContext<ColorThemeContextType | null>(null);

const useColorTheme = () => {
  const [colorTheme, setColorTheme] = useState<ColorThemeType>(COLOR_THEME.LIGHT);

  const toggleTheme = () =>
    setColorTheme(prevTheme =>
      prevTheme === COLOR_THEME.LIGHT ? COLOR_THEME.DARK : COLOR_THEME.LIGHT,
    );

  return {
    theme: colorTheme === COLOR_THEME.LIGHT ? theme : darkTheme,
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
