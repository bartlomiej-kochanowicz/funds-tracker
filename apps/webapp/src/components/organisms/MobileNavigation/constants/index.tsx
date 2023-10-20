import { Icon } from "components/atoms";
import { FaHome, FaShapes, FaWallet } from "react-icons/fa";
import { ROUTES } from "routes/paths";

export const mobileNavigationNavigation = [
	{
		to: ROUTES.DASHBOARD,
		title: "navigation.dashboard",
		icon: (
			<Icon
				icon={FaHome}
				$size="1.5"
			/>
		),
	},
	{
		to: ROUTES.PORTFOLIOS.PORTFOLIOS,
		title: "navigation.portfolios",
		icon: (
			<Icon
				icon={FaWallet}
				$size="1.5"
			/>
		),
	},
	{
		to: ROUTES.HUB,
		title: "navigation.hub",
		icon: (
			<Icon
				icon={FaShapes}
				$size="1.5"
			/>
		),
	},
];
