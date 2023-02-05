import { object, string } from 'yup';

export const validationSchema = object().shape({
  amount: string()
    .matches(/^[0-9]+$/, 'form.field.required.number')
    .required('form.field.required'),
});
