import {
	Dialog,
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@funds-tracker/ui";
import { HomepageDialogContent } from "components/homepage-dialog-content";
import { paths } from "config/paths";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { SignUpConfirmForm } from "./sign-up-confirm-form";

const SignUpConfirm = () => {
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
				title={t("page.sign-up-confirm.title")}
				description={t("page.sign-up-confirm.description")}
			>
				<SignUpConfirmForm />
			</HomepageDialogContent>
		</Dialog>
	);
};

export { SignUpConfirm };
