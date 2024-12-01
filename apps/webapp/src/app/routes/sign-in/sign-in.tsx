import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	Separator,
	Text,
} from "@funds-tracker/ui";
import Logo from "assets/logo/logo.svg?react";
import LogoDark from "assets/logo/logo-dark.svg?react";
import AppleLogo from "assets/social/apple.svg?react";
import GoogleLogo from "assets/social/google.svg?react";
import { ErrorBoundary } from "components/error-boundary";
import { ErrorMessage } from "components/error-message";
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
			<DialogContent mobileFullScreen>
				<div className="mx-auto max-w-96">
					<ErrorBoundary fallback={<ErrorMessage className="h-52" />}>
						<Logo className="light:hidden mx-auto size-10" />
						<LogoDark className="mx-auto size-10 dark:hidden" />

						<div className="flex h-[calc(100svh-104px)] items-center sm:h-auto">
							<div>
								<DialogHeader className="mb-10 sm:my-10">
									<DialogTitle>{t("page.sign-in.title")}</DialogTitle>
									<DialogDescription>{t("page.sign-in.description")}</DialogDescription>
								</DialogHeader>

								<div className="my-5 flex flex-col gap-5">
									<Button variant="white">
										<GoogleLogo />
										{t("page.sign-in.sign-in-with-google")}
									</Button>
									<Button variant="white">
										<AppleLogo />
										{t("page.sign-in.sign-in-with-apple")}
									</Button>
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
							</div>
						</div>
					</ErrorBoundary>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export { SignIn };
