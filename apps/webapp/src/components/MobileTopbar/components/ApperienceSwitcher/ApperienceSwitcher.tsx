import { Text } from "@faunds-tracker/ui";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { useTranslation } from "react-i18next";

import { ApperienceWrapper } from "./ApperienceSwitcher.styles";

export const ApperienceSwitcher = ({ ref, ...props }: ItemChildrenProps) => {
	const { t } = useTranslation();

	return (
		<ApperienceWrapper
			{...props}
			role="group"
			aria-labelledby={t("common.apperience")}
		>
			<Text id={t("common.apperience")}>{t("common.apperience")}</Text>

			<Spreader />

			<ThemeSwitcher />
		</ApperienceWrapper>
	);
};

ApperienceSwitcher.displayName = "ApperienceSwitcher";
