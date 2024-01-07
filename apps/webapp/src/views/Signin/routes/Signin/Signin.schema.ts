import i18n from "utils/i18n";
import { object, ObjectSchema, string } from "yup";

import { SigninFormValues } from "./Signin.types";

export const validationSchema = (isPasswordStep: boolean): ObjectSchema<SigninFormValues> =>
	object<SigninFormValues>().shape({
		userEmail: string()
			.email(i18n.t("page.signin.email.invalid"))
			.required(i18n.t("page.signin.email.required")),
		userPassword: string().when("userEmail", {
			is: () => isPasswordStep,
			then: () => string().required(i18n.t("page.signin.password.required")),
		}),
	}) as ObjectSchema<SigninFormValues>;
