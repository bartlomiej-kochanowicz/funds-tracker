import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { Root } from 'views/Root';
import { GlobalStyle } from 'styles/GlobalStyle';
import { FullscreenErrorContent } from 'components/organisms';
import { ColorThemeProvider, useColorThemeContext } from 'contexts/ColorThemeContext';
import client from 'config/client';
import { UserProvider } from 'contexts/UserContext';

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
        <UserProvider>
          <Content />
        </UserProvider>
      </ColorThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
