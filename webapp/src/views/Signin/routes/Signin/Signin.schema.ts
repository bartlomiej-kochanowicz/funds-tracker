import { object, string } from 'yup';
import i18n from 'utils/i18n';

export const validationSchema = (isPasswordStep: boolean) =>
  object().shape({
    userEmail: string()
      .email(i18n.t('page.signin.email.invalid'))
      .required(i18n.t('page.signin.email.required')),
    userPassword: string().when('userEmail', {
      is: () => isPasswordStep,
      then: string().required(i18n.t('page.signin.password.required')),
    }),
  });
