import { TopbarSidebar } from "components/layouts/TopbarSidebar";
import { ProtectedRoute } from "components/ProtectedRoute";
import { ROUTES } from "routes/paths";

import { CashAccounts } from "./CashAccounts";

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
