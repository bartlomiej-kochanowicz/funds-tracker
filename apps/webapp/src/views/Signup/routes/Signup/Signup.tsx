import { ThemeSwitcher } from "components";
import { Box, Heading, Spacer, Text } from "components/atoms";
import { LangSelector } from "components/molecules";
import { FullscreenClear } from "layouts/FullscreenClear";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { SignupForm } from "./SignupForm";

export const Signup = () => {
	const { t } = useTranslation();

	return (
		<FullscreenClear>
			<Heading $textAlign="center">{t("common.sign_up")}</Heading>

			<Spacer $space="0.5" />

			<Text
				$fontSize="0.875"
				$fontColor="gray400"
				$textAlign="center"
			>
				{t("page.signup.description")}
			</Text>

			<Spacer $space="1.5" />

			<SignupForm />

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

			<Spacer $space="1.5" />

			<Spacer $space="1.5" />

			<Box
				$flex
				$flexDirection="column"
				$alignItems="center"
			>
				<LangSelector />

				<Spacer />

				<ThemeSwitcher />
			</Box>
		</FullscreenClear>
	);
};
