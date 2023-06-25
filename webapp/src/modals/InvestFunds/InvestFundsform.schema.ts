import { EMPTY_VALIDATION_MESSAGE } from 'constants/common';
import { date, number, object, string } from 'yup';

export const validationSchema = object().shape({
  instrument: object()
    .shape({
      Code: string(),
      Exchange: string(),
      Name: string(),
      Type: string(),
      Country: string(),
      Currency: string(),
      ISIN: string(),
      previousClose: number(),
      __typename: string(),
    })
    .required(''),
  portfolio: string().required(EMPTY_VALIDATION_MESSAGE),
  date: date().required(EMPTY_VALIDATION_MESSAGE),
  quantity: string().required(EMPTY_VALIDATION_MESSAGE),
  price: string().required(EMPTY_VALIDATION_MESSAGE),
  commission: string().required(EMPTY_VALIDATION_MESSAGE),
  commission_type: string().oneOf(['%', 'amount']).required(EMPTY_VALIDATION_MESSAGE),
  transaction_cost: string().required(EMPTY_VALIDATION_MESSAGE),
});
