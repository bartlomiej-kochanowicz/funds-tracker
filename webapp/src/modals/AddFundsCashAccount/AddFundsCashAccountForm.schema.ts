import { object, number } from 'yup';

export const validationSchema = object().shape({
  amount: number().required('form.field.required'),
});
