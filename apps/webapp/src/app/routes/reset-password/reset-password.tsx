import { Dialog } from "@funds-tracker/ui";
import { HomepageDialogContent } from "components/homepage-dialog-content";
import { paths } from "config/paths";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
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
				test
			</HomepageDialogContent>
		</Dialog>
	);
};

export { ResetPassword };
