import { EMPTY_VALIDATION_MESSAGE } from 'constants/common';
import { date, mixed, object, ObjectSchema, string } from 'yup';

import { InvestFundsFormValues } from './helpers/defaultValues';

export const validationSchema = object<InvestFundsFormValues>().shape({
  instrument: object()
    .shape({
      Code: string(),
      Other: mixed(),
    })
    .required(EMPTY_VALIDATION_MESSAGE),
  portfolio: string().required(EMPTY_VALIDATION_MESSAGE),
  date: date().required(EMPTY_VALIDATION_MESSAGE),
  quantity: string().required(EMPTY_VALIDATION_MESSAGE),
  price: string().required(EMPTY_VALIDATION_MESSAGE),
  comission: string().required(EMPTY_VALIDATION_MESSAGE),
  comission_type: string().oneOf(['%', 'amount']).required(EMPTY_VALIDATION_MESSAGE),
  transaction_cost: string().required(EMPTY_VALIDATION_MESSAGE),
}) as unknown as ObjectSchema<InvestFundsFormValues>;
