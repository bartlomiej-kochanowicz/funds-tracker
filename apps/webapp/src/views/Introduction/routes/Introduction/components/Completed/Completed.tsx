import { Heading, Spacer, Text, ThumbUp } from "components/atoms";
import { useTranslation } from "react-i18next";
/* import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths"; */
import { Button } from "ui";

export const Completed = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center">
			<ThumbUp />

			<Spacer $space="1.5" />

			<Heading>{t("add.instrument.success.title")}</Heading>

			<Spacer $space="0.5" />

			<Text
				$fontSize="0.875"
				$fontColor="gray400"
				$textAlign="center"
			>
				{t("add.instrument.success.description")}
			</Text>

			<Spacer $space="1.5" />

			<Button
				className="w-full"
				color="black"
				/* as={Link}
				to={ROUTES.DASHBOARD} */
			>
				{t("add.instrument.success.dashboard")}
			</Button>
		</div>
	);
};
