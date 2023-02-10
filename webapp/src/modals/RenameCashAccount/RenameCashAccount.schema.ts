import { object, string } from 'yup';
import i18n from 'utils/i18n';

export const validationSchema = object().shape({
  name: string().required(i18n.t('form.field.required')).min(2, '‎').max(50, '‎'),
});
