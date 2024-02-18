import { PortfolioCreateInput } from "__generated__/graphql";
import i18n from "utils/i18n";
import { object, ObjectSchema, string } from "yup";

export const validationSchema = object<PortfolioCreateInput>().shape({
	name: string().required(i18n.t("form.field.required")).min(2, "‎").max(50, "‎"),
}) as ObjectSchema<PortfolioCreateInput>;
