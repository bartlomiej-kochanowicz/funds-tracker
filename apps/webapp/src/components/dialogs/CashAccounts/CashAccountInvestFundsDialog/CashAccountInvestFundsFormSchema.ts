import { InstrumentType, SearchInstrument } from "__generated__/graphql";
import { EMPTY_VALIDATION_MESSAGE } from "constants/common";
import instruments from "constants/instruments";
import { date, InferType, mixed, number, object, string } from "yup";

export const CashAccountInvestFundsFormSchema = object().shape({
	instrumentType: mixed<InstrumentType>()
		.oneOf(instruments)
		.required(EMPTY_VALIDATION_MESSAGE)
		.nullable(),
	instrument: object<SearchInstrument>()
		.shape({
			Code: string().required(),
			Exchange: string().required(),
			Name: string().required(),
			Type: string().required(),
			Country: string().required(),
			Currency: string().required(),
			ISIN: string(),
			previousClose: number().required(),
			previousCloseDate: string().required(),
		})
		.required(EMPTY_VALIDATION_MESSAGE)
		.nullable(),
	portfolio: string().required(EMPTY_VALIDATION_MESSAGE).nullable(),
	date: date().required(EMPTY_VALIDATION_MESSAGE).nullable(),
	quantity: number().required(EMPTY_VALIDATION_MESSAGE).nullable(),
	price: number().required(EMPTY_VALIDATION_MESSAGE).nullable(),
	comission: string()
		.when("comission_type", {
			is: (type: string) => type === "%",
			then: schema => schema.matches(/^(100(\.0+)?|\d{1,2}(\.\d+)?)$/, EMPTY_VALIDATION_MESSAGE),
		})
		.required(EMPTY_VALIDATION_MESSAGE),
	comission_type: string().oneOf(["%", "amount"]).required(EMPTY_VALIDATION_MESSAGE),
	transaction_cost: string().required(EMPTY_VALIDATION_MESSAGE),
});

export type CashAccountInvestFundsFormSchemaType = InferType<
	typeof CashAccountInvestFundsFormSchema
>;

export const defaultValues: CashAccountInvestFundsFormSchemaType = {
	instrumentType: null,
	instrument: null,
	portfolio: null,
	date: null,
	quantity: null,
	price: null,
	comission: "",
	comission_type: "%",
	transaction_cost: "",
};
