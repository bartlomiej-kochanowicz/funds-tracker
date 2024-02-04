import { buttonVariants, Card, H1, Text } from "@funds-tracker/ui";
import { LangSelector } from "components/LangSelector";
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
			<Card>
				<Card.Header className="text-center">
					<H1>{t("common.sign_up")}</H1>

					<Text
						muted
						className="mb-6 mt-2 text-sm"
					>
						{t("page.signup.description")}
					</Text>
				</Card.Header>

				<Card.Content className="my-3">
					<SignupForm />
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
			</Card>

			<div className="mt-12 flex flex-col items-center">
				<LangSelector />

				<ThemeSwitcher />
			</div>
		</ClearCentered>
	);
};
