import i18n from 'utils/i18n';
import { object, string } from 'yup';

export const validationSchema = object().shape({
  code: string()
    .required(i18n.t('form.field.required'))
    .matches(/^[0-9]+$/, i18n.t('form.field.required.number'))
    .min(6, i18n.t('form.field.required.characters'))
    .max(6, i18n.t('form.field.required.characters')),
});
