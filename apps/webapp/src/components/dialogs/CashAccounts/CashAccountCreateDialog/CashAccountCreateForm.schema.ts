import { CashAccountCreateInput } from "__generated__/graphql";
import i18n from "utils/i18n";
import { object, ObjectSchema, string } from "yup";

export const validationSchema = object<CashAccountCreateInput>().shape({
	name: string().required(i18n.t("form.field.required")).min(2, "‎").max(50, "‎"),
	currency: string().required(),
}) as ObjectSchema<CashAccountCreateInput>;
