import { TFunction } from "i18next";
import * as z from "zod";

const loginFormSchema = (isPasswordStep: boolean, t: TFunction) =>
	z.object({
		userEmail: z
			.string()
			.min(1, { message: t("form.email.required") })
			.email({ message: t("form.email.invalid") }),
		userPassword: z.string().refine(
			val => {
				console.log("@@@", isPasswordStep);
				return !isPasswordStep;
			},
			{
				message: t("form.password.required"),
			},
		),
		/* . min(8, { message: t("form.password.min") })
			.max(32, { message: t("form.password.max") }), */
	});

type LoginFormSchema = z.infer<ReturnType<typeof loginFormSchema>>;

export { type LoginFormSchema, loginFormSchema };
