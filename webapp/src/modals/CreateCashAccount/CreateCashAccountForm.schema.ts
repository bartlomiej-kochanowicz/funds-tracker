import { object, string } from 'yup';

export const validationSchema = object().shape({
  name: string().required('‎').min(2, '‎').max(50, '‎'),
  currency: string().required(),
});
