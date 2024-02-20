import i18n from "utils/i18n";
import { InferType, object, ref, string } from "yup";

export const EnterPasswordFormSchema = object().shape({
	userPassword: string()
		.min(12, i18n.t("page.signin.password.too_short"))
		.max(50, i18n.t("page.signin.password.too_long"))
		.required(i18n.t("page.signin.password.required")),
	userPasswordConfirmation: string()
		.required(i18n.t("page.signup.password.confirm.required"))
		.oneOf([ref("userPassword")], i18n.t("page.signup.password.do_not_match")),
});

export type EnterPasswordFormSchemaType = InferType<typeof EnterPasswordFormSchema>;
