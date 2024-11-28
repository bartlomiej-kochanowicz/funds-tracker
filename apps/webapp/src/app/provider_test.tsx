import { ApolloProvider } from "@apollo/client";
import { ErrorBoundary } from "components/ErrorBoundary";
import { FullscreenErrorContent } from "components/FullscreenErrorContent";
import client from "config/client";
import { UserContextProvider } from "contexts/UserContext";
import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

type Props = {
	children: ReactNode;
};

const Provider = ({ children }: Props) => (
	<BrowserRouter>
		<ApolloProvider client={client}>
			<UserContextProvider>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
				>
					<ErrorBoundary fallback={<FullscreenErrorContent />}>{children}</ErrorBoundary>
				</ThemeProvider>
			</UserContextProvider>
		</ApolloProvider>
	</BrowserRouter>
);

export { Provider };
