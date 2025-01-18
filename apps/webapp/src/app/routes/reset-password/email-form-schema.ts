import { TFunction } from "i18next";
import { z } from "zod";

const emailFormSchema = ({ t }: { t: TFunction }) =>
	z.object({
		userEmail: z
			.string()
			.email({ message: t("form.email.invalid") })
			.min(1, { message: t("form.email.required") }),
	});

type EmailFormSchema = z.infer<ReturnType<typeof emailFormSchema>>;

export { type EmailFormSchema, emailFormSchema };
