import { Currency } from "__generated__/graphql";
import { CURRENCIES_ARRAY } from "constants/selectors/currencies";
import { object, string } from "yup";

export type FormSchemaType = {
	defaultCurrency: Currency;
};

export const validationSchema = object<FormSchemaType>().shape({
	defaultCurrency: string().oneOf(CURRENCIES_ARRAY).required("Required"),
});
