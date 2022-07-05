import { object, string } from 'yup';

export const validationSchema = object().shape({
  userEmail: string().email('Invalid email').required('Required'),
  userPassword: string().min(12, 'Too Short!').max(50, 'Too Long!').required('Required'),
});
