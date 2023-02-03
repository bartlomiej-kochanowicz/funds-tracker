import { object, ref, string } from 'yup';

export const validationSchema = object().shape({
  userPassword: string()
    .min(12, 'page.signin.password.too_short')
    .max(50, 'page.signin.password.too_long')
    .required('page.signin.password.required'),
  userPasswordConfirmation: string()
    .required('page.signup.password.confirm.required')
    .oneOf([ref('userPassword')], 'page.signup.password.do_not_match'),
});
