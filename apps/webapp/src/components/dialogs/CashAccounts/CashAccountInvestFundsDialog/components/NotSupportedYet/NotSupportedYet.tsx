import { H2, H3 } from "@funds-tracker/ui";
import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";

export const NotSupportedYet: FC = () => {
	const { t } = useTranslation();

	return (
		<div className="mt-2 flex flex-col items-center gap-1 text-center">
			<H2>{t("modal.InvestFunds.form.not.supported.yet")}</H2>

			<H3>
				<Trans
					i18nKey="modal.InvestFunds.form.not.supported.yet.description"
					components={{
						support: (
							<a
								href="mailto:support@funds-tracker.com"
								className="text-primary"
							/>
						),
					}}
				/>
			</H3>
		</div>
	);
};
