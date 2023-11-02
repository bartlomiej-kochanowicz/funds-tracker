import { ArrowLeftRight, History, Landmark } from "lucide-react";
import { ROUTES } from "routes/paths";

export const hubNavigation = {
	essentials: [
		{
			to: ROUTES.CASH_ACCOUNTS,
			title: "navigation.cash_accounts",
			icon: Landmark,
		},
		{ to: ROUTES.TRANSACTIONS, title: "navigation.transactions", icon: ArrowLeftRight },
		{ to: ROUTES.HISTORY, title: "navigation.history", icon: History },
	],
};
