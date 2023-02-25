import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ApolloProvider } from '@apollo/client';
import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';
import NiceModal from '@ebay/nice-modal-react';
import { Root } from 'views/Root';
import { GlobalStyle } from 'styles/GlobalStyle';
import { FullscreenErrorContent } from 'components/organisms';
import { ColorThemeProvider, useColorThemeContext } from 'contexts/ColorThemeContext';
import { UserContextProvider } from 'contexts/UserContext';
import client from 'config/client';

const Content = () => {
  const { theme } = useColorThemeContext();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle modalVisible={false} />

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
        <NiceModal.Provider>
          <Root />
        </NiceModal.Provider>
      </ErrorBoundary>
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
