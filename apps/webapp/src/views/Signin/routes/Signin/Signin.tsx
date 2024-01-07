import { H1, Text } from "@funds-tracker/ui";
import { ClearCentered } from "components/layouts/ClearCentered";
import { ThemeSwitcher } from "components/ThemeSwitcher";
// import { LangSelector } from "components/molecules";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { SigninForm } from "./SigninForm";

export const Signin = () => {
	const { t } = useTranslation();

	return (
		<ClearCentered>
			<H1 className="text-center">{t("common.sign_in")}</H1>

			<Text className="mb-6 mt-2 text-center text-sm text-gray-600">
				{t("page.signin.description")}
			</Text>

			<SigninForm />

			<Text className="my-4 text-center text-sm text-gray-600">
				<Trans
					i18nKey="page.signin.dont_have_account"
					components={{
						signup: (
							<Link
								to={ROUTES.SIGNUP.SIGNUP}
								className="text-blue-500 hover:underline"
							/>
						),
					}}
				/>
			</Text>

			<Link
				className="block text-center text-sm text-blue-500 hover:underline"
				to={ROUTES.RESET_PASSWORD}
			>
				{t("page.signin.forgot_password")}
			</Link>

			<div className="mt-12 flex flex-col items-center">
				{/* <LangSelector /> */}

				<ThemeSwitcher />
			</div>
		</ClearCentered>
	);
};
