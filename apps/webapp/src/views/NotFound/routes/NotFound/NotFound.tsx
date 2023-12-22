import { H1, Text } from "@faunds-tracker/ui";
import { ClearCentered } from "components/layouts/ClearCentered";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const NotFound: FC = () => {
	const { t } = useTranslation();

	return (
		<ClearCentered>
			<H1 className="mb-4 text-center">404</H1>

			<Text className="text-center  text-gray-400">{t("common.page.not.found")}</Text>
		</ClearCentered>
	);
};
