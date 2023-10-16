import { IntroductionCreatePortfoliosInput } from '__generated__/graphql';
import { MAX_CASH_ACCOUNTS } from 'constants/common';
import { array, object, ObjectSchema, string } from 'yup';

export const validationSchema = object<IntroductionCreatePortfoliosInput>().shape({
  portfolios: array()
    // empty character to show not show error message
    .of(object({ name: string().required('‎').min(2, '‎') }))
    .min(1)
    .max(MAX_CASH_ACCOUNTS, '‎'),
}) as ObjectSchema<IntroductionCreatePortfoliosInput>;
