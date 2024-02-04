import { ApolloProvider } from "@apollo/client";
import { ErrorBoundary } from "components/ErrorBoundary";
import { FullscreenErrorContent } from "components/FullscreenErrorContent";
import client from "config/client";
import { UserContextProvider } from "contexts/UserContext";
import { ThemeProvider } from "next-themes";
import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
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
					<ErrorBoundary fallback={<FullscreenErrorContent />}>
						<Root />
					</ErrorBoundary>
				</ThemeProvider>
			</UserContextProvider>
		</ApolloProvider>
	</BrowserRouter>
);

export default App;
