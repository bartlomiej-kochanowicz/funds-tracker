import { Heading, Spacer, Text } from "components/atoms";
import { Fragment } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { EnterEmailForm } from "./EnterEmailForm";

export const EnterEmail = () => {
	const { t } = useTranslation();

	return (
		<Fragment>
			<Heading $textAlign="center">{t("page.signin.forgot_password")}</Heading>

			<Spacer $space="0.5" />

			<Text
				$fontSize="0.875"
				$fontColor="gray400"
				$textAlign="center"
			>
				{t("page.forgot_password.enter_email.description")}
			</Text>

			<Spacer $space="1.5" />

			<EnterEmailForm />

			<Spacer />

			<Text
				$fontSize="0.875"
				$fontColor="gray400"
				$textAlign="center"
			>
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
