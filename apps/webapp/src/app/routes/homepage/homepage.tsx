import { Button, H1, H2, H3, Separator, Text } from "@funds-tracker/ui";
import { AppleButton } from "components/apple-button";
import { Footer } from "components/footer";
import { GoogleButton } from "components/google-button";
import { Logo } from "components/logo";
import { paths } from "config/paths";
import { useUserContext } from "contexts/UserContext";
import { Trans, useTranslation } from "react-i18next";
import { Link, Navigate } from "react-router-dom";

const Homepage = () => {
	const { t } = useTranslation();
	const { user, loading } = useUserContext();

	const isAuthenticated = !loading && user;

	if (loading) {
		return null;
	}

	if (isAuthenticated) {
		return (
			<Navigate
				to={paths.dashboard}
				replace
			/>
		);
	}

	return (
		<>
			<main className="mx-auto min-h-[calc(100svh-100px)] p-9 lg:flex lg:max-w-8xl lg:items-center lg:gap-28 xl:gap-40">
				<div className="lg:w-1/2">
					<Logo className="size-12 lg:hidden" />
					<Logo
						className="hidden lg:block"
						variant="text"
					/>
				</div>

				<div className="lg:w-1/2">
					<H1 className="my-10 leading-tight">{t("page.homepage.slogan")}</H1>
					<H2>{t("page.homepage.join-today")}</H2>
					<div className="my-5 flex flex-col gap-5">
						<GoogleButton>{t("page.homepage.sign-up-with-google")}</GoogleButton>
						<AppleButton>{t("page.homepage.sign-up-with-apple")}</AppleButton>
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
