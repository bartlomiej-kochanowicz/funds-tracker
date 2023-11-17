import { Heading, Spacer, Tile } from "components/atoms";
import { useBreakpoint } from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { hubNavigation } from "./constants";
import { Grid } from "./Hub.styles";

export const Hub = () => {
	const isDesktop = useBreakpoint("desktop", "min");

	const { t } = useTranslation();

	if (isDesktop) {
		return (
			<Navigate
				to={ROUTES.DASHBOARD}
				replace
			/>
		);
	}

	return (
		<div className="flex flex-col">
			<Heading
				$level="h3"
				$fontColor="gray400"
			>
				{t("navigation.dashboard")}
			</Heading>

			<Spacer $space="0.5" />

			<div className="grid gap-6">
				{hubNavigation.essentials.map(({ icon, title, to }) => {
					const Icon = icon;

					return (
						<Tile
							key={title}
							title={t(title)}
							to={to}
						>
							<Icon />
						</Tile>
					);
				})}
			</div>
		</div>
	);
};

Hub.displayName = "Hub";
