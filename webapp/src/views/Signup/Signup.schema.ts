import { object, ref, string } from 'yup';

export const validationSchema = object().shape({
  userEmail: string().email('page.signin.email.invalid').required('page.signin.email.required'),
  userPassword: string()
    .min(12, 'page.signin.password.too_short')
    .max(50, 'page.signin.password.too_long')
    .required('page.signin.password.required'),
  userPasswordConfirmation: string().oneOf([ref('password'), null], 'Passwords must match'),
});
