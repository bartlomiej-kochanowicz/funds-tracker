import { TFunction } from "i18next";
import { z } from "zod";

const signUpConfirmFormSchema = ({ t }: { t: TFunction }) =>
	z.object({
		code: z.string().min(6, {
			message: t("form.code.invalid"),
		}),
	});

type SignUpConfirmFormSchema = z.infer<ReturnType<typeof signUpConfirmFormSchema>>;

export { type SignUpConfirmFormSchema, signUpConfirmFormSchema };
