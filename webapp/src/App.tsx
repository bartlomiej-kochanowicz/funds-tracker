import { ApolloProvider } from '@apollo/client';
import NiceModal from '@ebay/nice-modal-react';
import { FullscreenErrorContent } from 'components/organisms';
import client from 'config/client';
import { ColorThemeProvider, useColorThemeContext } from 'contexts/ColorThemeContext';
import { UserContextProvider } from 'contexts/UserContext';
import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/GlobalStyle';
import { Root } from 'views/Root';

const Content = () => {
  const { theme } = useColorThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <NiceModal.Provider>
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
      </NiceModal.Provider>
    </ThemeProvider>
  );
};

const App: FC = (): JSX.Element => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ColorThemeProvider>
        <UserContextProvider>
          <Content />
        </UserContextProvider>
      </ColorThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
