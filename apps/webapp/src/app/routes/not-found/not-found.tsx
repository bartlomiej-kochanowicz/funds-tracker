import { Button, H1, H2, Text } from "@funds-tracker/ui";
import { paths } from "config/paths";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NotFound = () => {
	const { t } = useTranslation();

	return (
		<main className="mx-auto flex h-svh max-w-2xl flex-col items-center justify-center p-9 text-center">
			<H1 className="mb-5 text-8xl lg:text-8xl">404</H1>
			<H2 className="mb-2">{t("page.not-found.title")}</H2>
			<Text muted>{t("page.not-found.description")}</Text>
			<Button
				className="mt-5 w-fit"
				asChild
			>
				<Link to={paths.homepage}>{t("page.not-found.go-to-homepage")}</Link>
			</Button>
		</main>
	);
};

export { NotFound };
