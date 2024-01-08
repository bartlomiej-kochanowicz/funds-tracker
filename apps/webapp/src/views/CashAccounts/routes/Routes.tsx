import { TopbarSidebar } from "components/layouts/TopbarSidebar";
import { ProtectedRoute } from "components/ProtectedRoute";
import { lazy } from "react";
import { ROUTES } from "routes/paths";

const CashAccounts = lazy(() =>
	import("./CashAccounts").then(({ CashAccounts: component }) => ({
		default: component,
	})),
);

export const CashAccountsRoutes = [
	{
		path: ROUTES.CASH_ACCOUNTS,
		element: (
			<ProtectedRoute>
				<TopbarSidebar>
					<CashAccounts />
				</TopbarSidebar>
			</ProtectedRoute>
		),
	},
];
