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
import { UserContextProvider } from 'contexts/UserContext';
import client from 'config/client';
import { ModalsProvider, useModalsContext } from 'contexts/ModalsContext';

const Content = () => {
  const { theme } = useColorThemeContext();
  const { modals, modalsVisible } = useModalsContext();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle modalsVisible={modalsVisible} />

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
        {modals}

        <Root />
      </ErrorBoundary>
    </ThemeProvider>
  );
};

const App: FC = (): JSX.Element => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ColorThemeProvider>
        <UserContextProvider>
          <ModalsProvider>
            <Content />
          </ModalsProvider>
        </UserContextProvider>
      </ColorThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
