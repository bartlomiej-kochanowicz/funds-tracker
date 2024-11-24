import i18n from "utils/i18n";
import * as z from "zod";

const loginFormSchema = (isPasswordStep: boolean) =>
	z.object({
		userEmail: z
			.string()
			.email({ message: i18n.t("page.signin.email.invalid") })
			.min(1, { message: i18n.t("page.signin.email.required") }),
		userPassword: z.string().refine(val => !isPasswordStep || val.length > 0, {
			message: i18n.t("page.signin.password.required"),
		}),
	});

type LoginFormSchema = z.infer<ReturnType<typeof loginFormSchema>>;

export { type LoginFormSchema, loginFormSchema };
