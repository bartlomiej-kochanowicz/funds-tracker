import { InstrumentType, SearchInstrument } from "__generated__/graphql";
import { EMPTY_VALIDATION_MESSAGE } from "constants/common";
import instruments from "constants/instruments";
import { date, InferType, mixed, number, object, string } from "yup";

export const CashAccountInvestFundsFormSchema = object().shape({
	instrumentType: mixed<InstrumentType>().oneOf(instruments).required(EMPTY_VALIDATION_MESSAGE),
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
		.required(EMPTY_VALIDATION_MESSAGE),
	portfolio: string().required(EMPTY_VALIDATION_MESSAGE),
	date: date().required(EMPTY_VALIDATION_MESSAGE),
	quantity: number().required(EMPTY_VALIDATION_MESSAGE).min(0.0001),
	price: number().required(EMPTY_VALIDATION_MESSAGE).min(0.0001),
	comission: number().required(EMPTY_VALIDATION_MESSAGE),
	comission_type: string().oneOf(["%", "amount"]).required(EMPTY_VALIDATION_MESSAGE),
	transaction_cost: number().required(EMPTY_VALIDATION_MESSAGE).notOneOf([0]),
});

export type CashAccountInvestFundsFormSchemaType = InferType<
	typeof CashAccountInvestFundsFormSchema
>;

export const defaultValues: Partial<CashAccountInvestFundsFormSchemaType> = {
	price: 0,
	quantity: 0,
	comission_type: "%",
	comission: 0,
	transaction_cost: 0,
};
