import { ArrowLeftRight, History, Home, Landmark, Wallet } from "lucide-react";
import { ROUTES } from "routes/paths";

export const sidebarNavigation = [
	{ to: ROUTES.DASHBOARD, title: "navigation.dashboard", icon: Home },
	{ to: ROUTES.PORTFOLIOS.PORTFOLIOS, title: "navigation.portfolios", icon: Wallet },
	{
		to: ROUTES.CASH_ACCOUNTS,
		title: "navigation.cash_accounts",
		icon: Landmark,
	},
	{ to: ROUTES.TRANSACTIONS, title: "navigation.transactions", icon: ArrowLeftRight },
	{ to: ROUTES.HISTORY, title: "navigation.history", icon: History },
];
