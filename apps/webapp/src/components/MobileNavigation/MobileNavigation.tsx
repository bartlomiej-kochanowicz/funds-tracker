import { MOBILE_NAVIGATION } from "constants/navigation";

import { NavItem } from "./NavItem";

export const MobileNavigation = () => (
	<nav className="fixed inset-x-0 bottom-0 z-10 px-3 py-2 backdrop-blur-sm lg:hidden">
		<ul className="flex justify-between">
			{MOBILE_NAVIGATION.map(item => (
				<NavItem {...item} />
			))}
		</ul>
	</nav>
);
