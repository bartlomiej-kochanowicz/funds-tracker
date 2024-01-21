import { Card, H1, Text } from "@funds-tracker/ui";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";

import { EnterPasswordForm } from "./EnterPasswordForm";

interface EnterPasswordProps {
	token: string;
}

export const EnterPassword: FC<EnterPasswordProps> = ({ token }) => {
	const { t } = useTranslation();

	return (
		<Fragment>
			<Card.Header className="text-center">
				<H1>{t("page.forgot_password.enter_password.title")}</H1>

				<Text
					muted
					className="mb-6 mt-2 text-sm"
				>
					{t("page.forgot_password.enter_password.description")}
				</Text>
			</Card.Header>

			<Card.Content className="my-3">
				<EnterPasswordForm token={token} />
			</Card.Content>
		</Fragment>
	);
};

EnterPassword.displayName = "EnterPassword";
