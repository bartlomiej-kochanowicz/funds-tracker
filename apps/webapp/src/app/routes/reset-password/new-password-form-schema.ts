import { TFunction } from "i18next";
import { z } from "zod";

export const newPasswordFormSchema = ({ t }: { t: TFunction }) =>
	z
		.object({
			userPassword: z
				.string()
				.min(1, { message: t("form.password.required") })
				.min(12, { message: t("form.password.invalid") })
				.max(64, { message: t("form.password.invalid") }),
			userPasswordConfirm: z
				.string()
				.min(1, { message: t("form.password.required") })
				.min(12, { message: t("form.password.invalid") })
				.max(64, { message: t("form.password.invalid") }),
		})
		.superRefine((data, ctx) => {
			if (data.userPasswordConfirm !== data.userPassword) {
				ctx.addIssue({
					code: z.ZodIssueCode.too_small,
					path: ["userPasswordConfirm"],
					minimum: 1,
					message: t("form.confirm-password.invalid"),
					inclusive: true,
					type: "string",
				});
			}
		});

export type NewPasswordFormSchema = z.infer<ReturnType<typeof newPasswordFormSchema>>;
