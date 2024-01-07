import i18n from "utils/i18n";
import { object, string } from "yup";

export const validationSchema = object().shape({
	userEmail: string()
		.email(i18n.t("page.signin.email.invalid"))
		.required(i18n.t("page.signin.email.required")),
});
