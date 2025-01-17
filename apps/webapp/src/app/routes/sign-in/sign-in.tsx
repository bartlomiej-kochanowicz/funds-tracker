import { Button, Dialog, Separator, Text } from "@funds-tracker/ui";
import { AppleButton } from "components/apple-button";
import { GoogleButton } from "components/google-button";
import { HomepageDialogContent } from "components/homepage-dialog-content";
import { paths } from "config/paths";
import { Trans, useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { SignInForm } from "./sign-in-form";

const SignIn = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleOpenChange = () => {
		navigate(paths.homepage);
	};

	return (
		<Dialog
			open
			onOpenChange={handleOpenChange}
		>
			<HomepageDialogContent
				title={t("page.sign-in.title")}
				description={t("page.sign-in.description")}
			>
				<div className="my-5 flex flex-col gap-5">
					<GoogleButton disabled>{t("page.sign-in.sign-in-with-google")}</GoogleButton>
					<AppleButton disabled>{t("page.sign-in.sign-in-with-apple")}</AppleButton>
				</div>

				<Separator>
					<Text muted>{t("common.or")}</Text>
				</Separator>

				<SignInForm />

				<Button
					variant="outline"
					className="mt-5 w-full"
					asChild
				>
					<Link to={paths.resetPassword}>{t("page.sign-in.forgot-password")}</Link>
				</Button>
				<Text
					muted
					className="mt-10 block text-xs sm:mb-10"
				>
					<Trans
						i18nKey="page.sign-in.do-not-have-an-account"
						components={{
							signup: (
								<Link
									to={paths.signUp.signUp}
									className="text-primary"
								/>
							),
						}}
					/>
				</Text>
			</HomepageDialogContent>
		</Dialog>
	);
};

export { SignIn };
