import { TFunction } from "i18next";
import * as z from "zod";

const signInFormSchema = (isPasswordStep: boolean, t: TFunction) =>
	z.object({
		userEmail: z
			.string()
			.min(1, { message: t("form.email.required") })
			.email({ message: t("form.email.invalid") }),
		userPassword: z.string().refine(
			val => {
				if (isPasswordStep && (val.length < 8 || val.length > 32)) {
					return false;
				}

				return true;
			},
			{
				message: t("form.password.invalid"),
			},
		),
	});

type SignInFormSchema = z.infer<ReturnType<typeof signInFormSchema>>;

export { type SignInFormSchema, signInFormSchema };
