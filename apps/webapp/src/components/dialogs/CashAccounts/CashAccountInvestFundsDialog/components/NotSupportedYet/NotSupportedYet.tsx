import { Text } from "@funds-tracker/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const NotSupportedYet: FC = () => {
	const { t } = useTranslation();

	return (
		<div className="my-2 flex flex-col items-center gap-1 text-center">
			<Text>{t("modal.InvestFunds.form.not.supported.yet")}</Text>

			<Text
				muted
				className="text-xs"
			>
				{t("modal.InvestFunds.form.not.supported.yet.description")}
			</Text>
		</div>
	);
};
