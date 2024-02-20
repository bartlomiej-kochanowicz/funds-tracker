import i18n from "utils/i18n";
import { InferType, object, string } from "yup";

export const EnterEmailFormSchema = object().shape({
	userEmail: string()
		.email(i18n.t("page.signin.email.invalid"))
		.required(i18n.t("page.signin.email.required")),
});

export type EnterEmailFormSchemaType = InferType<typeof EnterEmailFormSchema>;
