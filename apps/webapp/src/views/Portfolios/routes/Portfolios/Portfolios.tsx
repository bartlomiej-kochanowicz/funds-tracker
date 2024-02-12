import { CardsList } from "components/layouts/CardsList";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

const PortfoliosContent = lazy(() =>
	import("./components/PortfoliosContent").then(({ PortfoliosContent: component }) => ({
		default: component,
	})),
);

export const Portfolios = () => {
	const { t } = useTranslation();

	return (
		<CardsList
			title={t("navigation.portfolios")}
			description={t("page.portfolios.title.description")}
		>
			<PortfoliosContent />
		</CardsList>
	);
};
