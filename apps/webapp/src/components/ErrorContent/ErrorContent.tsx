import { H2, Text } from "@funds-tracker/ui";
import { Frown } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const ErrorContent: FC = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center">
			<Frown className="size-10 text-red-500" />

			<H2>{t("error.component.title")}</H2>

			<Text
				muted
				className="text-sm"
			>
				{t("error.component.description")}
			</Text>
		</div>
	);
};
