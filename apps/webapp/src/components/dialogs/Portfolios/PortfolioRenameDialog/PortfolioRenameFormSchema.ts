import { PortfolioUpdateInput } from "__generated__/graphql";
import { EMPTY_VALIDATION_MESSAGE } from "constants/common";
import i18n from "utils/i18n";
import { InferType, object, string } from "yup";

export const PortfolioRenameFormSchema = object<PortfolioUpdateInput>().shape({
	name: string()
		.required(i18n.t("form.field.required"))
		.min(2, EMPTY_VALIDATION_MESSAGE)
		.max(50, EMPTY_VALIDATION_MESSAGE),
});

export type PortfolioRenameFormSchemaType = InferType<typeof PortfolioRenameFormSchema>;
