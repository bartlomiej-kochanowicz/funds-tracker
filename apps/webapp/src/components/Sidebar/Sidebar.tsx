import LogoNameVertical from "assets/logo/logo-name-vertical.svg?react";
import LogoNameVerticalDark from "assets/logo/logo-name-vertical-dark.svg?react";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { NavItem } from "./components/NavItem";
import { sidebarNavigation } from "./constants";

export const Sidebar = () => (
	<div className="fixed bottom-0 start-0 top-0 z-20 hidden w-64 border-e border-gray-300 bg-white pb-10 pt-7 dark:border-neutral-700 dark:bg-zinc-800 lg:bottom-0 lg:end-auto lg:block lg:translate-x-0 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 [&::-webkit-scrollbar-track]:bg-gray-100 dark:[&::-webkit-scrollbar-track]:bg-slate-700 [&::-webkit-scrollbar]:w-2">
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
					{sidebarNavigation.map(item => (
						<NavItem {...item} />
					))}
				</ul>
			</nav>
			<div className="mx-auto block w-fit p-6">
				<ThemeSwitcher />
			</div>
		</div>
	</div>
);
