import { ReactNode, ReactElement, ComponentType } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';

const render = (ui: ReactElement, options?: RenderOptions) => {
  const AllProviders = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );

  return rtlRender(ui, { wrapper: AllProviders as ComponentType, ...options });
};

export * from '@testing-library/react';

export { render };
