import { Heading, Spacer } from "components/atoms";
import { FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "ui";

import { EnterPasswordForm } from "./EnterPasswordForm";

interface EnterPasswordProps {
	token: string;
}

export const EnterPassword: FC<EnterPasswordProps> = ({ token }) => {
	const { t } = useTranslation();

	return (
		<Fragment>
			<Heading $textAlign="center">{t("page.forgot_password.enter_password.title")}</Heading>

			<Spacer $space="0.5" />

			<Text className="text-center text-sm text-gray-400">
				{t("page.forgot_password.enter_password.description")}
			</Text>

			<Spacer $space="1.5" />

			<EnterPasswordForm token={token} />
		</Fragment>
	);
};

EnterPassword.displayName = "EnterPassword";
