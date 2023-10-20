import { ApolloProvider } from "@apollo/client";
import NiceModal from "@ebay/nice-modal-react";
import { FullscreenErrorContent } from "components/organisms";
import client from "config/client";
import { ColorThemeProvider, useColorThemeContext } from "contexts/ColorThemeContext";
import { UserContextProvider } from "contexts/UserContext";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { ThemeProvider } from "next-themes";
import { Root } from "views/Root";

const Content = () => {
	const { theme } = useColorThemeContext();

	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
		>
			<StyledComponentsThemeProvider theme={theme}>
				<NiceModal.Provider>
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
			</StyledComponentsThemeProvider>
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
