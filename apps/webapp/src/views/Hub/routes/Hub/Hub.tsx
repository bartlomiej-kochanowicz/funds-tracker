import { H1, Tile, useTailwindBreakpoint } from "@funds-tracker/ui";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { hubNavigation } from "./constants";

export const Hub = () => {
	const isMd = useTailwindBreakpoint("md");

	const { t } = useTranslation();

	if (isMd) {
		return (
			<Navigate
				to={ROUTES.HOME}
				replace
			/>
		);
	}

	return (
		<div className="flex flex-col">
			<H1>{t("navigation.explore")}</H1>

			<div className="mt-4 grid grid-cols-3 gap-6 sm:grid-cols-4">
				{hubNavigation.essentials.map(({ icon: Icon, title, to }) => (
					<Tile
						key={title}
						title={t(title)}
						to={to}
					>
						<Icon className="size-6" />
					</Tile>
				))}
			</div>
		</div>
	);
};

Hub.displayName = "Hub";
