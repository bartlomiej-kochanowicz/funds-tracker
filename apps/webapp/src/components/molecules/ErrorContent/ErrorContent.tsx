import { Text } from "components/atoms";
import { Frown } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const ErrorContent: FC = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center">
			<Frown />

			<Text $fontWeight="700">{t("error.component.title")}</Text>

			<Text
				$fontSize="0.875"
				$fontColor="gray400"
				$textAlign="center"
			>
				{t("error.component.description")}
			</Text>
		</div>
	);
};
