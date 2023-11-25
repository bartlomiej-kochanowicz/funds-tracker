import { Frown } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "ui";

export const ErrorContent: FC = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center">
			<Frown />

			<Text className="font-bold">{t("error.component.title")}</Text>

			<Text className="text-center text-sm text-gray-600">{t("error.component.description")}</Text>
		</div>
	);
};
