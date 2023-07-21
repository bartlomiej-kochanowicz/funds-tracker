import { Instrument, SearchInstrument } from '__generated__/graphql';
import { EMPTY_VALIDATION_MESSAGE } from 'constants/common';
import { date, mixed, number, object, ObjectSchema, string } from 'yup';

import { InvestFundsFormValues } from './helpers/defaultValues';

export const validationSchema: ObjectSchema<InvestFundsFormValues> =
  object<InvestFundsFormValues>().shape({
    instrumentType: mixed<Instrument>()
      .oneOf(Object.values(Instrument))
      .required(EMPTY_VALIDATION_MESSAGE),
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
    quantity: string().required(EMPTY_VALIDATION_MESSAGE),
    price: string().required(EMPTY_VALIDATION_MESSAGE),
    comission: string().required(EMPTY_VALIDATION_MESSAGE),
    comission_type: string().oneOf(['%', 'amount']).required(EMPTY_VALIDATION_MESSAGE),
    transaction_cost: string().required(EMPTY_VALIDATION_MESSAGE),
  });
