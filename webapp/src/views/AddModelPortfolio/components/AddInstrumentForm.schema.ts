import { object, string } from 'yup';

export const validationSchema = object().shape({
  instrumentName: string().required('page.login.email.required'),
  instrumentType: string().required('page.login.email.required'),
});
