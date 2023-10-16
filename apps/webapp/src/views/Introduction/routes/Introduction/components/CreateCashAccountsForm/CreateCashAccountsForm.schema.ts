import { IntroductionCreateCashAccountsInput } from '__generated__/graphql';
import { MAX_CASH_ACCOUNTS } from 'constants/common';
import { array, object, ObjectSchema, string } from 'yup';

export const validationSchema: ObjectSchema<IntroductionCreateCashAccountsInput> =
  object<IntroductionCreateCashAccountsInput>().shape({
    cashAccounts: array()
      .of(
        object({
          name: string().min(2, '‎').max(50, '‎'),
          currency: string().required(),
        }),
      )
      .min(1)
      .max(MAX_CASH_ACCOUNTS, '‎'),
  }) as ObjectSchema<IntroductionCreateCashAccountsInput>;
