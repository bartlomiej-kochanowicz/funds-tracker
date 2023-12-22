import { H1, Text } from "@faunds-tracker/ui";
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
			<H1 className="text-center">{t("page.forgot_password.enter_password.title")}</H1>

			<Text className="mb-6 mt-2 text-center text-sm text-gray-600">
				{t("page.forgot_password.enter_password.description")}
			</Text>

			<EnterPasswordForm token={token} />
		</Fragment>
	);
};

EnterPassword.displayName = "EnterPassword";
