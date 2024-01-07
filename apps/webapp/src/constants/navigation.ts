import { ArrowLeftRight, History, Home, Landmark, Shapes, Wallet } from "lucide-react";
import { ROUTES } from "routes/paths";

export const NAVIGATION = [
	{ to: ROUTES.HOME, title: "navigation.home", icon: Home },
	{ to: ROUTES.PORTFOLIOS.PORTFOLIOS, title: "navigation.portfolios", icon: Wallet },
	{
		to: ROUTES.CASH_ACCOUNTS,
		title: "navigation.cash_accounts",
		icon: Landmark,
	},
	{ to: ROUTES.TRANSACTIONS, title: "navigation.transactions", icon: ArrowLeftRight },
	{ to: ROUTES.HISTORY, title: "navigation.history", icon: History },
];

export const MOBILE_NAVIGATION = [
	{ to: ROUTES.HOME, title: "navigation.home", icon: Home },
	{ to: ROUTES.PORTFOLIOS.PORTFOLIOS, title: "navigation.portfolios", icon: Wallet },
	{
		to: ROUTES.CASH_ACCOUNTS,
		title: "navigation.cash_accounts",
		icon: Landmark,
	},
	{ to: ROUTES.HUB, title: "navigation.hub", icon: Shapes },
];
