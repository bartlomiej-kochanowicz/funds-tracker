import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';
import { Root } from 'views/Root';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/GlobalStyle';
import { FullscreenErrorContent } from 'components/organisms';
import { ColorThemeProvider, useColorThemeContext } from 'contexts/ColorThemeContext';
import { ApolloProvider } from '@apollo/client';
import client from 'config/client';

const Content = () => {
  const { theme } = useColorThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ErrorBoundary FallbackComponent={FullscreenErrorContent}>
        <Root />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

const App: FC = (): JSX.Element => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ColorThemeProvider>
        <Content />
      </ColorThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
