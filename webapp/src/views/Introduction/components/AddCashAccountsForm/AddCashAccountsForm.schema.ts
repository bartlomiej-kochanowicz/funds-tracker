import { object, array, string } from 'yup';

export const validationSchema = object().shape({
  accounts: array()
    // empty character to show not show error message
    .of(object({ name: string().required('‎').min(2, '‎'), currency: string().required() }))
    .min(1),
});
