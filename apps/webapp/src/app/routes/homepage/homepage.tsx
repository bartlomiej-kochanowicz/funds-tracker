import { Button, H1, H2, H3, Separator, Text } from "@funds-tracker/ui";
import Logo from "assets/logo/logo.svg?react";
import LogoDark from "assets/logo/logo-dark.svg?react";
import LogoNameVertical from "assets/logo/logo-name-vertical.svg?react";
import LogoNameVerticalDark from "assets/logo/logo-name-vertical-dark.svg?react";
import AppleLogo from "assets/social/apple.svg?react";
import GoogleLogo from "assets/social/google.svg?react";
import { Footer } from "components/footer";
import { paths } from "config/paths";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Homepage = () => {
	const { t } = useTranslation();

	return (
		<>
			<main className="mx-auto min-h-[calc(100svh-56px)] p-9 lg:flex lg:max-w-8xl lg:items-center lg:gap-28 xl:gap-40">
				<div className="lg:w-1/2">
					<Logo className="light:hidden size-12 lg:hidden" />
					<LogoDark className="size-12 dark:hidden lg:hidden" />
					<LogoNameVertical className="light:hidden hidden lg:block" />
					<LogoNameVerticalDark className="hidden dark:hidden lg:block" />
				</div>

				<div className="lg:w-1/2">
					<H1 className="my-10 leading-tight">{t("page.homepage.slogan")}</H1>
					<H2>{t("page.homepage.join-today")}</H2>
					<div className="my-5 flex flex-col gap-5">
						<Button variant="white">
							<GoogleLogo />
							{t("page.homepage.sign-up-with-google")}
						</Button>
						<Button variant="white">
							<AppleLogo />
							{t("page.homepage.sign-up-with-apple")}
						</Button>
					</div>
					<Separator>
						<Text muted>{t("common.or")}</Text>
					</Separator>
					<Button
						className="mt-5 w-full"
						asChild
					>
						<Link to={paths.signUp.signUp}>{t("page.homepage.create-account")}</Link>
					</Button>
					<Text
						muted
						className="text-xs"
					>
						<Trans
							i18nKey="page.homepage.disclaimer"
							components={{
								tos: (
									<Link
										to={paths.termsOfService}
										className="text-primary"
									/>
								),
								privacy: (
									<Link
										to={paths.privacyPolicy}
										className="text-primary"
									/>
								),
								cookie: (
									<Link
										to={paths.cookies}
										className="text-primary"
									/>
								),
							}}
						/>
					</Text>
					<H3 className="mt-10">{t("page.homepage.already-have-an-account")}</H3>
					<Button
						variant="outline"
						className="mt-3 w-full"
						asChild
					>
						<Link to={paths.signIn}>{t("page.homepage.sign-in")}</Link>
					</Button>
				</div>
			</main>
			<Footer />
		</>
	);
};

export { Homepage };
