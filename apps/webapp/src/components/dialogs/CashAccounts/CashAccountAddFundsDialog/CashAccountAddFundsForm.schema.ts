import i18n from "utils/i18n";
import { number, object } from "yup";

export const validationSchema = object().shape({
	amount: number().required(i18n.t("form.field.required")).min(0).max(1000000000000), // miliard
});
