import { Box, Spacer, ThemeSwitcher } from "components/atoms";
import { LangSelector } from "components/molecules";
import { useColorThemeContext } from "contexts/ColorThemeContext";
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
	const { isDark } = useColorThemeContext();

	return (
		<StyledColumn $justifyContent="space-between">
			<Box $flex $flexDirection="column">
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
			</Box>

			<Box $flex $flexDirection="column" $alignItems="center">
				<ThemeSwitcher />

				<Spacer />

				<LangSelector />
			</Box>
		</StyledColumn>
	);
};
