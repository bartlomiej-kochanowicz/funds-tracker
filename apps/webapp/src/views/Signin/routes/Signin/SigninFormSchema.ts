import i18n from "utils/i18n";
import { InferType, object, string } from "yup";

export const SigninFormSchema = (isPasswordStep: boolean) =>
	object().shape({
		userEmail: string()
			.email(i18n.t("page.signin.email.invalid"))
			.required(i18n.t("page.signin.email.required")),
		userPassword: string().when("userEmail", {
			is: () => isPasswordStep,
			then: () => string().required(i18n.t("page.signin.password.required")),
		}),
	});

export type SigninFormSchemaType = InferType<ReturnType<typeof SigninFormSchema>>;
