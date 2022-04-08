import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Root } from 'Views/Root';
import { ThemeProvider } from 'styled-components';
import { theme } from 'Styles/theme';

const App: FC = (): JSX.Element => (
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Root />
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
