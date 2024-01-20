import LogoNameVertical from "assets/logo/logo-name-vertical.svg?react";
import LogoNameVerticalDark from "assets/logo/logo-name-vertical-dark.svg?react";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { Profile } from "../Profile";

export const Topbar = () => (
	<header className="fixed inset-x-0 top-0 z-10 flex w-full flex-wrap border-b bg-background py-2.5 text-sm md:py-4">
		<nav className="mx-auto flex w-full basis-full items-center justify-between px-4 md:justify-end md:px-8">
			<Link
				to={ROUTES.HOME}
				className="dark:outline-blue-800 md:hidden"
			>
				<LogoNameVerticalDark className="h-8 w-auto dark:hidden" />
				<LogoNameVertical className="hidden h-8 w-auto dark:block " />
			</Link>

			<Profile />
		</nav>
	</header>
);
