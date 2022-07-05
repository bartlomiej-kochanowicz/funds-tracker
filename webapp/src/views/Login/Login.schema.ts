import { object, string } from 'yup';

export const validationSchema = object().shape({
  email: string().email('Invalid email').required('Required'),
  password: string().min(12, 'Too Short!').max(50, 'Too Long!').required('Required'),
});
