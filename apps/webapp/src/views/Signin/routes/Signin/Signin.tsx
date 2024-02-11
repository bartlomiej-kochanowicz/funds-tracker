import { buttonVariants, Card, H1, Text } from "@funds-tracker/ui";
import { LangSelector } from "components/LangSelector";
import { ClearCentered } from "components/layouts/ClearCentered";
import { ThemeToggle } from "components/ThemeToggle";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { SigninForm } from "./SigninForm";

export const Signin = () => {
	const { t } = useTranslation();

	return (
		<ClearCentered>
			<Card>
				<Card.Header className="text-center">
					<H1>{t("common.sign_in")}</H1>
					<Text
						muted
						className="mb-6 mt-2 text-sm"
					>
						{t("page.signin.description")}
					</Text>
				</Card.Header>

				<Card.Content className="my-3">
					<SigninForm />
				</Card.Content>

				<Card.Footer className="flex flex-col">
					<Text
						muted
						className="text-center text-sm"
					>
						<Trans
							i18nKey="page.signin.dont_have_account"
							components={{
								signup: (
									<Link
										to={ROUTES.SIGNUP.SIGNUP}
										className={buttonVariants({ variant: "link", size: "sm" })}
									/>
								),
							}}
						/>
					</Text>

					<Link
						className={buttonVariants({ variant: "link", size: "sm" })}
						to={ROUTES.RESET_PASSWORD}
					>
						{t("page.signin.forgot_password")}
					</Link>
				</Card.Footer>
			</Card>

			<div className="mx-32 mt-12 flex flex-col items-center">
				<LangSelector />

				<ThemeToggle />
			</div>
		</ClearCentered>
	);
};
