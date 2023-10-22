import { ThemeSwitcher } from "components";
import { Spacer } from "components/atoms";
import { LangSelector } from "components/molecules";
import { lazy, Suspense } from "react";

import { LogoFallback } from "./components/LogoFallback";
import { NavList } from "./components/NavList";
import { sidebarNavigation } from "./constants";
import { StyledColumn } from "./Sidebar.styles";

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
		<StyledColumn $justifyContent="space-between">
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
		</StyledColumn>
	);
};
