import { ThemeSwitcher } from "components";
import { Spacer } from "components/atoms";
import { LangSelector } from "components/molecules";
import { lazy, Suspense } from "react";

import { LogoFallback } from "./components/LogoFallback";
import { NavList } from "./components/NavList";
import { sidebarNavigation } from "./constants";

const LogoNameVertical = lazy(() =>
	import("assets/logo/logo-name-vertical.svg").then(({ ReactComponent: component }) => ({
		default: component,
	})),
);

const LogoNameVerticalDark = lazy(() =>
	import("assets/logo/logo-name-vertical-dark.svg").then(({ ReactComponent: component }) => ({
		default: component,
	})),
);

export const Sidebar = () => {
	const isDark = false;

	return (
		<div className="fixed left-0 top-0 z-10 flex h-full flex-col justify-between pb-14 pl-4 pr-0 pt-6">
			<div className="flex flex-col">
				<Suspense fallback={<LogoFallback />}>
					{isDark ? (
						<LogoNameVertical
							height="35px"
							style={{
								width: "fit-content",
								maxWidth: "140px",
								display: "block",
								marginLeft: "20px",
							}}
						/>
					) : (
						<LogoNameVerticalDark
							height="35px"
							style={{
								width: "fit-content",
								maxWidth: "140px",
								display: "block",
								marginLeft: "20px",
							}}
						/>
					)}
				</Suspense>

				<Spacer $space="1.5" />

				<Spacer />

				<NavList navigation={sidebarNavigation} />
			</div>

			<div className="flex flex-col items-center">
				<ThemeSwitcher />

				<Spacer />

				<LangSelector />
			</div>
		</div>
	);
};
