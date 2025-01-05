import { Dialog } from "@funds-tracker/ui";
import { HomepageDialogContent } from "components/homepage-dialog-content";
import { paths } from "config/paths";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { SignUpForm } from "./sign-up-form";

const SignUp = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	return (
		<Dialog
			open
			onOpenChange={() => {
				navigate(paths.homepage);
			}}
		>
			<HomepageDialogContent
				title={t("page.sign-up.title")}
				description={t("page.sign-up.description")}
			>
				<SignUpForm />
			</HomepageDialogContent>
		</Dialog>
	);
};

export { SignUp };
