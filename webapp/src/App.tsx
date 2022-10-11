import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Root } from 'views/Root';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/GlobalStyle';
import { store } from 'store';
import { theme } from 'styles/theme';
import { ErrorContent } from 'components/molecules';

const App: FC = (): JSX.Element => (
  <Provider store={store}>
    <BrowserRouter>
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

        <ErrorBoundary FallbackComponent={ErrorContent}>
          <Root />
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);

export default App;
