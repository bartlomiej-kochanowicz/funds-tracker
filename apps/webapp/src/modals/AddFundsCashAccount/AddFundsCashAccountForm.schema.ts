import i18n from 'utils/i18n';
import { object, string } from 'yup';

export const validationSchema = object().shape({
  amount: string()
    .matches(/^[0-9]+$/, i18n.t('form.field.required.number'))
    .required(i18n.t('form.field.required'))
    .min(1)
    .max(10), // miliard
});
