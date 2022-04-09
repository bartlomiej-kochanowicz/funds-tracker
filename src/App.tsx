import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Root } from 'views/Root';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';
import { GlobalStyle } from 'styles/GlobalStyle';

const App: FC = (): JSX.Element => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Root />
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
