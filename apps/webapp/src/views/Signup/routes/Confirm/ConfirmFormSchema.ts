import i18n from "utils/i18n";
import { InferType, object, string } from "yup";

export const ConfirmFormSchema = object().shape({
	code: string()
		.required(i18n.t("form.field.required"))
		.matches(/^[0-9]+$/, i18n.t("form.field.required.number"))
		.min(6, i18n.t("form.field.required.characters", { quantity: 6 }))
		.max(6, i18n.t("form.field.required.characters", { quantity: 6 })),
});

export type ConfirmFormSchemaType = InferType<typeof ConfirmFormSchema>;
