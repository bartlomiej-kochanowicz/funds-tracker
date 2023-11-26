import { FullscreenLoading } from "components/layouts/FullscreenLoading";
import { FC, Suspense } from "react";
import { useRoutes } from "react-router-dom";
/* import { CashAccountsRoutes } from "views/CashAccounts";
import { DashboardRoutes } from "views/Dashboard/routes/Routes"; */
import { HomeRoutes } from "views/Home";
/* import { HubRoutes } from "views/Hub"; */
import { NotFoundRoutes } from "views/NotFound";
/* import { PortfoliosRoutes } from "views/Portfolios"; */
import { ResetPasswordRoutes } from "views/ResetPassword";
/* import { SettingsRoutes } from "views/Settings"; */
import { SinginRoutes } from "views/Signin";
import { SignupRoutes } from "views/Signup";

export const Root: FC = () => {
	const views = useRoutes([
		...HomeRoutes,
		...SinginRoutes,
		...SignupRoutes,
		...ResetPasswordRoutes,
		/* ...DashboardRoutes,
		...PortfoliosRoutes,
		...CashAccountsRoutes,
		...SettingsRoutes,
		...HubRoutes, */
		...NotFoundRoutes,
	]);

	return <Suspense fallback={<FullscreenLoading />}>{views}</Suspense>;
};
