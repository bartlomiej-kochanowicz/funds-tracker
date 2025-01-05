import i18n from "utils/i18n";
import { z } from "zod";

export const signUpFormSchema = (isPasswordsStep: boolean) =>
	z.object({
		userName: z
			.string()
			.min(1, { message: i18n.t("form.name.required") })
			.min(4, { message: i18n.t("form.name.invalid") })
			.max(50, { message: i18n.t("form.name.invalid") }),
		userEmail: z
			.string()
			.min(1, { message: i18n.t("form.email.required") })
			.email({ message: i18n.t("form.email.invalid") }),
		userPassword: z
			.string()
			.min(1, { message: i18n.t("form.password.required") })
			.min(8, { message: i18n.t("form.password.invalid") })
			.max(50, { message: i18n.t("form.password.invalid") })
			.optional(),
		/* .refine(val => !isPasswordsStep || !!val, {
				message: i18n.t("form.password.required"),
			}), */
		userPasswordConfirmation: z
			.string()
			.min(1, { message: i18n.t("form.password.required") })
			.optional(),
		/* .refine((val: string, ctx) => !isPasswordsStep || val === ctx.parent.userPassword, {
				message: i18n.t("page.signup.password.do_not_match"),
			})
			.refine(val => !isPasswordsStep || !!val, {}) */
	});

export type SignUpFormSchema = z.infer<ReturnType<typeof signUpFormSchema>>;
