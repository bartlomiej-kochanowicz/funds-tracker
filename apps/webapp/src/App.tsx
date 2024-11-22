import { ApolloProvider } from "@apollo/client";
import { ErrorBoundary } from "components/ErrorBoundary";
import { FullscreenErrorContent } from "components/FullscreenErrorContent";
import client from "config/client";
import { PreBuiltUIList, SuperTokensConfig } from "config/supertokens";
import { UserContextProvider } from "contexts/UserContext";
import { ThemeProvider } from "next-themes";
import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
/* import { Root } from "views/Root"; */

SuperTokens.init(SuperTokensConfig);

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
						<SuperTokensWrapper>
							{/* <Root /> */}
							<Routes>
								{getSuperTokensRoutesForReactRouterDom(reactRouterDom, PreBuiltUIList)}
								<Route
									path="/dashboard"
									element={<SessionAuth>secure content</SessionAuth>}
								/>
							</Routes>
						</SuperTokensWrapper>
					</ErrorBoundary>
				</ThemeProvider>
			</UserContextProvider>
		</ApolloProvider>
	</BrowserRouter>
);

export default App;
