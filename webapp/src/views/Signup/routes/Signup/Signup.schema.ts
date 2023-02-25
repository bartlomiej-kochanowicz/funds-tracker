import i18n from 'utils/i18n';
import { object, ref, string } from 'yup';

export const validationSchema = (isPasswordsStep: boolean) =>
  object().shape({
    userName: string()
      .min(4, i18n.t('page.signup.name.too_short'))
      .max(50, i18n.t('page.signup.name.too_long'))
      .required(i18n.t('page.signup.name.required')),
    userEmail: string()
      .email(i18n.t('page.signin.email.invalid'))
      .required(i18n.t('page.signin.email.required')),
    userPassword: string().when(['userName', 'userEmail'], {
      is: () => isPasswordsStep,
      then: string()
        .min(12, i18n.t('page.signin.password.too_short'))
        .max(50, i18n.t('page.signin.password.too_long'))
        .required(i18n.t('page.signin.password.required')),
    }),
    userPasswordConfirmation: string().when(['userName', 'userEmail'], {
      is: () => isPasswordsStep,
      then: string()
        .required(i18n.t('page.signup.password.confirm.required'))
        .oneOf([ref('userPassword')], i18n.t('page.signup.password.do_not_match')),
    }),
  });
