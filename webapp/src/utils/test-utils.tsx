import { ReactNode, ReactElement, ComponentType } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { theme } from 'styles/theme';
import { store } from 'store';
import { ColorThemeProvider } from 'contexts/ColorThemeContext';
import i18n from './i18nForTests';

const render = (ui: ReactElement, options?: RenderOptions) => {
  const AllProviders = ({ children }: { children: ReactNode }) => (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <ColorThemeProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorThemeProvider>
      </Provider>
    </I18nextProvider>
  );

  return rtlRender(ui, { wrapper: AllProviders as ComponentType, ...options });
};

export * from '@testing-library/react';

export { render };
