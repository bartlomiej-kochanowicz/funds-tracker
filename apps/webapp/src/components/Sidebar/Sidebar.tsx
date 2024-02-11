import LogoNameVertical from "assets/logo/logo-name-vertical.svg?react";
import LogoNameVerticalDark from "assets/logo/logo-name-vertical-dark.svg?react";
import { ThemeToggle } from "components/ThemeToggle";
import { NAVIGATION } from "constants/navigation";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { NavItem } from "./components/NavItem";

export const Sidebar = () => (
	<div className="fixed inset-y-0 z-20 hidden w-64 border-e bg-background pb-10 pt-7 md:block">
		<div className="px-6">
			<Link
				to={ROUTES.HOME}
				className="dark:outline-blue-800"
			>
				<LogoNameVerticalDark className="h-auto w-36 dark:hidden" />
				<LogoNameVertical className="hidden h-auto w-36 dark:block " />
			</Link>
		</div>

		<div className="flex h-full flex-col justify-between">
			<nav className="flex w-full flex-col flex-wrap p-6">
				<ul className="space-y-1.5">
					{NAVIGATION.map(item => (
						<NavItem
							{...item}
							key={item.to}
						/>
					))}
				</ul>
			</nav>
			<div className="mx-auto block w-fit p-6">
				<ThemeToggle />
			</div>
		</div>
	</div>
);
