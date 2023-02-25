import { MAX_CASH_ACCOUNTS } from 'constants/common';
import { array, object, string } from 'yup';

export const validationSchema = object().shape({
  portfolios: array()
    // empty character to show not show error message
    .of(object({ name: string().required('‎').min(2, '‎') }))
    .min(1)
    .max(MAX_CASH_ACCOUNTS, '‎'),
});
