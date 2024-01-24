import { CardsList } from "components/layouts/CardsList";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

const CashAccountsContent = lazy(() =>
	import("./components/CashAccountContent").then(({ CashAccountsContent: component }) => ({
		default: component,
	})),
);

export const CashAccounts = () => {
	const { t } = useTranslation();

	return (
		<CardsList
			title={t("navigation.cash_accounts")}
			description={t("page.cash_accounts.title.description")}
		>
			<CashAccountsContent />
		</CardsList>
	);
};
