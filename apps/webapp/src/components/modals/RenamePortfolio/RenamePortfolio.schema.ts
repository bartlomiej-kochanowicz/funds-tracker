import i18n from "utils/i18n";
import { object, string } from "yup";

export const validationSchema = object().shape({
	name: string().required(i18n.t("form.field.required")).min(2, "‎").max(50, "‎"),
});
