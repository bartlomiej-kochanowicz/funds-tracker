import { CreateCashAccountInput } from '__generated__/graphql';
import { object, ObjectSchema, string } from 'yup';

export const validationSchema = object<CreateCashAccountInput>().shape({
  name: string().required('‎').min(2, '‎').max(50, '‎'),
  currency: string().required(),
}) as ObjectSchema<CreateCashAccountInput>;
