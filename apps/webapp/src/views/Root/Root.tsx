import { Toaster } from "@funds-tracker/ui";
import { useTheme } from "next-themes";
import { ComponentProps, FC, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { CashAccountsRoutes } from "views/CashAccounts";
import { HomeRoutes } from "views/Home";
import { HubRoutes } from "views/Hub";
import { NotFoundRoutes } from "views/NotFound";
import { PortfoliosRoutes } from "views/Portfolios";
import { ResetPasswordRoutes } from "views/ResetPassword";
import { SettingsRoutes } from "views/Settings";
import { SinginRoutes } from "views/Signin";
import { SignupRoutes } from "views/Signup";

export const Root: FC = () => {
	const { theme = "system" } = useTheme();

	const views = useRoutes([
		...HomeRoutes,
		...SinginRoutes,
		...SignupRoutes,
		...ResetPasswordRoutes,
		...CashAccountsRoutes,
		...PortfoliosRoutes,
		...SettingsRoutes,
		...HubRoutes,
		...NotFoundRoutes,
	]);

	return (
		<Suspense>
			<Toaster theme={theme as ComponentProps<typeof Toaster>["theme"]} />

			{views}
		</Suspense>
	);
};
