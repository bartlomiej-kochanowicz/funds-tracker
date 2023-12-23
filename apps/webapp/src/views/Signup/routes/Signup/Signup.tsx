import { H1, Text } from "@faunds-tracker/ui";
import { ClearCentered } from "components/layouts/ClearCentered";
import { ThemeSwitcher } from "components/ThemeSwitcher";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { SignupForm } from "./SignupForm";

export const Signup = () => {
	const { t } = useTranslation();

	return (
		<ClearCentered>
			<H1 className="text-center">{t("common.sign_up")}</H1>

			<Text className="mb-6 mt-2 text-center text-sm text-gray-400">
				{t("page.signup.description")}
			</Text>

			<SignupForm />

			<Text className="my-4 text-center text-sm text-gray-400">
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

			<div className="mt-12 flex flex-col items-center">
				{/* <LangSelector /> */}

				<ThemeSwitcher />
			</div>
		</ClearCentered>
	);
};
