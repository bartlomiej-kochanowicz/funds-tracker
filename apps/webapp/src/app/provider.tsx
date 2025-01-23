import { ApolloProvider } from "@apollo/client";
import { Toaster, useToast } from "@funds-tracker/ui";
import { ErrorBoundary } from "components/error-boundary";
import { ErrorMessage } from "components/error-message";
import client from "config/client";
import { UserContextProvider } from "contexts/UserContext";
import { ThemeProvider } from "next-themes";
import { type ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

type Props = {
	children: ReactNode;
};

const Provider = ({ children }: Props) => {
	const { toasts } = useToast();

	return (
		<BrowserRouter>
			<ApolloProvider client={client}>
				<UserContextProvider>
					<ThemeProvider
						attribute="class"
						enableSystem={false}
					>
						<ErrorBoundary fallback={<ErrorMessage className="h-svh" />}>
							<Toaster toasts={toasts} />

							{children}
						</ErrorBoundary>
					</ThemeProvider>
				</UserContextProvider>
			</ApolloProvider>
		</BrowserRouter>
	);
};

export { Provider };
