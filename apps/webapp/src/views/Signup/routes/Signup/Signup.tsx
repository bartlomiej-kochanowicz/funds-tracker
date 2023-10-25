import { ThemeSwitcher } from "components";
import { Heading, Spacer } from "components/atoms";
import { LangSelector } from "components/molecules";
import { FullscreenClear } from "layouts/FullscreenClear";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";
import { Text } from "ui";

import { SignupForm } from "./SignupForm";

export const Signup = () => {
	const { t } = useTranslation();

	return (
		<FullscreenClear>
			<Heading $textAlign="center">{t("common.sign_up")}</Heading>

			<Spacer $space="0.5" />

			<Text className="text-center text-sm text-gray-400">{t("page.signup.description")}</Text>

			<Spacer $space="1.5" />

			<SignupForm />

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

			<Spacer $space="1.5" />

			<Spacer $space="1.5" />

			<div className="flex flex-col items-center">
				<LangSelector />

				<Spacer />

				<ThemeSwitcher />
			</div>
		</FullscreenClear>
	);
};
