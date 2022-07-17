import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Root } from 'views/Root';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/GlobalStyle';
import { store } from 'store';

const App: FC = (): JSX.Element => (
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <Root />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
