import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/GlobalStyle';

const themes = [theme];

addDecorator(withThemesProvider(themes), ThemeProvider);
addDecorator(stories => (
  <>
    <GlobalStyle />

    {stories()}
  </>
));

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
