import { Heading, Link, Spacer } from "components/atoms";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";

export const NotSupportedYet: FC = () => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center">
			<Spacer $space="0.5" />

			<Heading
				$level="h2"
				$fontColor="gray300"
				$textAlign="center"
				$fontSize="1.25"
			>
				{t("modal.InvestFunds.form.not.supported.yet")}
			</Heading>

			<Spacer $space="0.25" />

			<Heading
				$level="h3"
				$fontColor="gray300"
				$textAlign="center"
				$fontSize="0.875"
			>
				<Trans
					i18nKey="modal.InvestFunds.form.not.supported.yet.description"
					components={{
						support: (
							<Link
								href="mailto:support@funds-tracker.com"
								$fontColor="blue"
							/>
						),
					}}
				/>
			</Heading>
		</div>
	);
};