import i18n from "utils/i18n";
import { InferType, number, object } from "yup";

export const CashAccountAddFundsFormSchema = object().shape({
	amount: number().required(i18n.t("form.field.required")).min(0).max(1000000000000), // miliard
});

export type CashAccountAddFundsFormSchemaType = InferType<typeof CashAccountAddFundsFormSchema>;
