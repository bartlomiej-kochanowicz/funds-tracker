import { SearchInstrumentQuery } from "__generated__/graphql";
import { EMPTY_VALIDATION_MESSAGE } from "constants/common";
import { date, InferType, number, object, string } from "yup";

export const CashAccountInvestFundsFormSchema = object().shape({
	instrument: object<SearchInstrumentQuery>()
		.shape({
			currency: string().required(),
			exchangeShortName: string().required(),
			name: string().required(),
			stockExchange: string().optional(),
			symbol: string().required(),
		})
		.required(EMPTY_VALIDATION_MESSAGE),
	portfolio: string().required(EMPTY_VALIDATION_MESSAGE),
	date: date().max(new Date()).required(EMPTY_VALIDATION_MESSAGE),
	quantity: number().required(EMPTY_VALIDATION_MESSAGE).min(0.0001),
	price: number().required(EMPTY_VALIDATION_MESSAGE).min(0.0001),
	commission: number().required(EMPTY_VALIDATION_MESSAGE),
	commission_type: string().oneOf(["%", "amount"]).required(EMPTY_VALIDATION_MESSAGE),
	transaction_cost: number().required(EMPTY_VALIDATION_MESSAGE).notOneOf([0]),
});

export type CashAccountInvestFundsFormSchemaType = InferType<
	typeof CashAccountInvestFundsFormSchema
>;

export const defaultValues: Partial<CashAccountInvestFundsFormSchemaType> = {
	price: 0,
	quantity: 0,
	commission_type: "%",
	commission: 0,
	transaction_cost: 0,
};
