import { Dialog } from "@funds-tracker/ui";
import { HomepageDialogContent } from "components/homepage-dialog-content";
import { paths } from "config/paths";
import { useTranslation } from "react-i18next";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { SignUpConfirmForm } from "./sign-up-confirm-form";

const SignUpConfirm = () => {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const [searchParams] = useSearchParams();

	const email = searchParams.get("email");

	if (!email) {
		return <Navigate to={paths.homepage} />;
	}

	return (
		<Dialog
			open
			onOpenChange={() => {
				navigate(paths.homepage);
			}}
		>
			<HomepageDialogContent
				title={t("page.sign-up-confirm.title")}
				description={t("page.sign-up-confirm.description")}
			>
				<SignUpConfirmForm email={email} />
			</HomepageDialogContent>
		</Dialog>
	);
};

export { SignUpConfirm };
