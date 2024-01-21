import { buttonVariants, Card, H1, Text } from "@funds-tracker/ui";
import { Fragment } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { EnterEmailForm } from "./EnterEmailForm";

export const EnterEmail = () => {
	const { t } = useTranslation();

	return (
		<Fragment>
			<Card.Header className="text-center">
				<H1>{t("page.signin.forgot_password")}</H1>

				<Text
					muted
					className="mb-6 mt-2 text-sm"
				>
					{t("page.forgot_password.enter_email.description")}
				</Text>
			</Card.Header>

			<Card.Content>
				<EnterEmailForm />
			</Card.Content>

			<Card.Footer className="flex flex-col">
				<Text
					muted
					className="text-center text-sm"
				>
					<Trans
						i18nKey="page.signup.already_have_account"
						components={{
							signin: (
								<Link
									to={ROUTES.SIGNIN}
									className={buttonVariants({ variant: "link", size: "sm" })}
								/>
							),
						}}
					/>
				</Text>
			</Card.Footer>
		</Fragment>
	);
};

EnterEmail.displayName = "EnterEmail";
