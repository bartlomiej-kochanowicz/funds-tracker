import { Dialog } from "@funds-tracker/ui";
import { HomepageDialogContent } from "components/homepage-dialog-content";
import { paths } from "config/paths";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

import { EmailForm } from "./email-form";
import { NewPasswordForm } from "./new-password-form";

const ResetPassword = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();

	const handleOpenChange = () => {
		navigate(paths.homepage);
	};

	const [searchParams] = useSearchParams();

	const token = searchParams.get("token");

	return (
		<Dialog
			open
			onOpenChange={handleOpenChange}
		>
			<HomepageDialogContent
				title={t("page.reset-password.title")}
				description={t("page.reset-password.description")}
			>
				{token ? <NewPasswordForm token={token} /> : <EmailForm />}
			</HomepageDialogContent>
		</Dialog>
	);
};

export { ResetPassword };
