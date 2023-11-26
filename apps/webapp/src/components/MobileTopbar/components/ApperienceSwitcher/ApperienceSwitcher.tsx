import { ThemeSwitcher } from "components";
import { Spreader } from "components/atoms";
import { ItemChildrenProps } from "components/atoms/Menu/MenuItem";
import { useTranslation } from "react-i18next";
import { Text } from "ui";

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
