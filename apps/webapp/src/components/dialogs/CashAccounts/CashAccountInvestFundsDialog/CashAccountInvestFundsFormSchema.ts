import { InstrumentType, SearchInstrument } from "__generated__/graphql";
import { EMPTY_VALIDATION_MESSAGE } from "constants/common";
import instruments from "constants/instruments";
import { z } from "zod";

export const CashAccountInvestFundsFormSchema = z.object({
	instrumentType: z.nativeEnum(InstrumentType),
	/* instrument: object<SearchInstrument>()
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
	quantity: string()
		.matches(/^(100(\.0+)?|\d{1,2}(\.\d+)?)$/, EMPTY_VALIDATION_MESSAGE)
		.required(EMPTY_VALIDATION_MESSAGE),
	price: string().required(EMPTY_VALIDATION_MESSAGE),
	comission: string()
		.when("comission_type", {
			is: (type: string) => type === "%",
			then: schema => schema.matches(/^(100(\.0+)?|\d{1,2}(\.\d+)?)$/, EMPTY_VALIDATION_MESSAGE),
		})
		.required(EMPTY_VALIDATION_MESSAGE),
	comission_type: string().oneOf(["%", "amount"]).required(EMPTY_VALIDATION_MESSAGE),
	transaction_cost: string().required(EMPTY_VALIDATION_MESSAGE), */
});

export type CashAccountInvestFundsFormSchemaType = z.infer<typeof CashAccountInvestFundsFormSchema>;

export const defaultValues: CashAccountInvestFundsFormSchemaType = {
	instrumentType: instruments[0],
	/* instrument: {
		Code: "",
		Exchange: "",
		Name: "",
		Type: "",
		Country: "",
		Currency: "",
		ISIN: undefined,
		previousClose: 0,
		previousCloseDate: "",
	},
	portfolio: "",
	date: new Date(),
	quantity: "",
	price: "",
	comission: "",
	comission_type: "%",
	transaction_cost: "", */
};
