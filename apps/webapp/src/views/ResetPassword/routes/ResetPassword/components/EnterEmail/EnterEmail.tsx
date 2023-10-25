import { Heading, Spacer } from "components/atoms";
import { Fragment } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";
import { Text } from "ui";

import { EnterEmailForm } from "./EnterEmailForm";

export const EnterEmail = () => {
	const { t } = useTranslation();

	return (
		<Fragment>
			<Heading $textAlign="center">{t("page.signin.forgot_password")}</Heading>

			<Spacer $space="0.5" />

			<Text className="text-center text-sm text-gray-400">
				{t("page.forgot_password.enter_email.description")}
			</Text>

			<Spacer $space="1.5" />

			<EnterEmailForm />

			<Spacer />

			<Text className="text-center text-sm text-gray-400">
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
