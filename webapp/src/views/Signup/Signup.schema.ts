import { object, ref, string } from 'yup';

export const validationSchema = (isPasswordsStep: boolean) =>
  object().shape({
    userName: string().max(50, 'page.signup.name.too_long').required('page.signup.name.required'),
    userEmail: string().email('page.signin.email.invalid').required('page.signin.email.required'),
    userPassword: string().when(['userName', 'userEmail'], {
      is: () => isPasswordsStep,
      then: string()
        .min(12, 'page.signin.password.too_short')
        .max(50, 'page.signin.password.too_long')
        .required('page.signin.password.required'),
    }),
    userPasswordConfirmation: string().when(['userName', 'userEmail'], {
      is: () => isPasswordsStep,
      then: string()
        .required('page.signup.password.confirm.required')
        .oneOf([ref('userPassword')], 'page.signup.password.do_not_match'),
    }),
  });
