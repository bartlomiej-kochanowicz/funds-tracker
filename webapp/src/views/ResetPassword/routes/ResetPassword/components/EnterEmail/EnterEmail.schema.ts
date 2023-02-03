import { object, string } from 'yup';

export const validationSchema = object().shape({
  userEmail: string().email('page.signin.email.invalid').required('page.signin.email.required'),
});
