import { H1, Text } from "@faunds-tracker/ui";
import { Fragment } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { EnterEmailForm } from "./EnterEmailForm";

export const EnterEmail = () => {
	const { t } = useTranslation();

	return (
		<Fragment>
			<H1 className="text-center">{t("page.signin.forgot_password")}</H1>

			<Text className="mb-6 mt-2 text-center text-sm text-gray-600">
				{t("page.forgot_password.enter_email.description")}
			</Text>

			<EnterEmailForm />

			<Text className="my-4 text-center text-sm text-gray-600">
				<Trans
					i18nKey="page.signup.already_have_account"
					components={{
						signin: (
							<Link
								to={ROUTES.SIGNIN}
								className="text-blue-500 hover:underline"
							/>
						),
					}}
				/>
			</Text>
		</Fragment>
	);
};

EnterEmail.displayName = "EnterEmail";
