import { Box, Icon, Text } from "components/atoms";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { BiSad } from "react-icons/bi";

export const ErrorContent: FC = () => {
	const { t } = useTranslation();

	return (
		<Box
			$flex
			$flexDirection="column"
			$alignItems="center"
		>
			<Icon
				icon={BiSad}
				$color="error"
				$size="2.5"
			/>

			<Text $fontWeight="700">{t("error.component.title")}</Text>

			<Text
				$fontSize="0.875"
				$fontColor="gray400"
				$textAlign="center"
			>
				{t("error.component.description")}
			</Text>
		</Box>
	);
};
