import { object, string } from 'yup';

export const validationSchema = object().shape({
  userEmail: string().email('page.login.email.invalid').required('page.login.email.required'),
  userPassword: string()
    .min(12, 'page.login.password.too_short')
    .max(50, 'page.login.password.too_long')
    .required('page.login.password.required'),
});
