import { string, object } from 'yup';

export const validationSchema = object().shape({
  code: string()
    .required('form.field.required')
    .matches(/^[0-9]+$/, 'form.field.required.number')
    .min(6, 'form.field.required.characters')
    .max(6, 'form.field.required.characters'),
});
