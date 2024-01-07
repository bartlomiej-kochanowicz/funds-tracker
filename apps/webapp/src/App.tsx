import { ApolloProvider } from "@apollo/client";
import { FullscreenErrorContent } from "components/FullscreenErrorContent";
import client from "config/client";
import { UserContextProvider } from "contexts/UserContext";
import { ThemeProvider } from "next-themes";
import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Root } from "views/Root";

const App: FC = (): JSX.Element => (
	<BrowserRouter>
		<ApolloProvider client={client}>
			<UserContextProvider>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
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
			</UserContextProvider>
		</ApolloProvider>
	</BrowserRouter>
);

export default App;
