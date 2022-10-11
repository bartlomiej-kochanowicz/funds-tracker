import { createContext, FC, useContext, useState } from 'react';
import { COLOR_THEME } from 'constants/common';

type ColorThemeContextType = ReturnType<typeof useColorTheme>;

type ColorThemeType = keyof typeof COLOR_THEME;

const ColorThemeContext = createContext<ColorThemeContextType | null>(null);

const useColorTheme = () => {
  const [theme, setTheme] = useState<ColorThemeType>(COLOR_THEME.LIGHT);

  const toggleTheme = () =>
    setTheme(prevTheme => (prevTheme === COLOR_THEME.LIGHT ? COLOR_THEME.DARK : COLOR_THEME.LIGHT));

  return {
    theme,
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
