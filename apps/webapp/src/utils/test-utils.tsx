import { Currency, IntroductionStep } from "__generated__/graphql";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { render as rtlRender, RenderOptions } from "@testing-library/react";
import { ColorThemeProvider } from "contexts/ColorThemeContext";
import { UserContextProvider } from "contexts/UserContext";
import { GET_USER } from "graphql/query/common/GetUser";
import { ComponentType, ReactElement, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";

import i18n from "./i18nForTests";

export const userMock = {
	request: {
		query: GET_USER,
	},
	result: {
		data: {
			user: {
				uuid: "78c3faea-0a04-4949-90b8-7589b6572d22",
				name: "test123",
				email: "test123@test.xyz",
				createdAt: "2022-11-29T20:42:43.948Z",
				introductionStep: IntroductionStep.DefaultCurrency,
				defaultCurrency: Currency.Usd,
			},
		},
	},
};

interface Options extends RenderOptions {
	mocks?: readonly MockedResponse<Record<string, any>>[];
}

const render = (ui: ReactElement, options?: Options) => {
	const AllProviders = ({ children }: { children: ReactNode }) => (
		<MockedProvider
			mocks={[userMock, ...(options?.mocks ? options.mocks : [])]}
			addTypename={false}
		>
			<I18nextProvider i18n={i18n}>
				<ColorThemeProvider>
					<UserContextProvider>
						<ThemeProvider theme={theme}>{children}</ThemeProvider>
					</UserContextProvider>
				</ColorThemeProvider>
			</I18nextProvider>
		</MockedProvider>
	);

	return rtlRender(ui, { wrapper: AllProviders as ComponentType, ...options });
};

export * from "@testing-library/react";

export { render };
