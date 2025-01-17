import i18n from "utils/i18n";
import { z } from "zod";

export const signUpFormSchema = (isPasswordsStep: boolean) =>
	z
		.object({
			userName: z
				.string()
				.min(1, { message: i18n.t("form.name.required") })
				.min(3, { message: i18n.t("form.name.invalid") })
				.max(30, { message: i18n.t("form.name.invalid") }),
			userEmail: z
				.string()
				.min(1, { message: i18n.t("form.email.required") })
				.email({ message: i18n.t("form.email.invalid") }),
			userPassword: z.string().optional(),
			userPasswordConfirm: z.string().optional(),
		})
		.superRefine((data, ctx) => {
			if (isPasswordsStep) {
				if (!data.userPassword) {
					ctx.addIssue({
						code: z.ZodIssueCode.too_small,
						path: ["userPassword"],
						minimum: 1,
						message: i18n.t("form.password.required"),
						inclusive: true,
						type: "string",
					});
				}

				if (data.userPassword && (data.userPassword.length < 12 || data.userPassword.length > 64)) {
					ctx.addIssue({
						code: z.ZodIssueCode.too_small,
						path: ["userPassword"],
						minimum: 1,
						message: i18n.t("form.password.invalid"),
						inclusive: true,
						type: "string",
					});
				}

				if (!data.userPasswordConfirm) {
					ctx.addIssue({
						code: z.ZodIssueCode.too_small,
						path: ["userPasswordConfirm"],
						minimum: 1,
						message: i18n.t("form.password-confirm.required"),
						inclusive: true,
						type: "string",
					});
				}

				if (data.userPasswordConfirm !== data.userPassword) {
					ctx.addIssue({
						code: z.ZodIssueCode.too_small,
						path: ["userPasswordConfirm"],
						minimum: 1,
						message: i18n.t("form.password-confirm.invalid"),
						inclusive: true,
						type: "string",
					});
				}
			}
		});

export type SignUpFormSchema = z.infer<ReturnType<typeof signUpFormSchema>>;
