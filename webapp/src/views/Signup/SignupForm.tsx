import { yupResolver } from '@hookform/resolvers/yup';
import { Input, Spacer } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { validationSchema } from './Signup.schema';
import { Form } from './Signup.styles';

export const SignupForm = () => {
  const { t } = useTranslation();

  const defaultValues = { userName: '', userEmail: '', userPassword: '' };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const userNameProps = useInput<typeof defaultValues>({
    register,
    name: 'userName',
    errors,
  });

  const userEmailProps = useInput<typeof defaultValues>({
    register,
    name: 'userEmail',
    errors,
  });

  const onSubmit = async ({ userEmail, userPassword }: typeof defaultValues) => {
    console.log({ userEmail, userPassword });
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Input
        placeholder={t('name')}
        type="text"
        {...userNameProps}
      />

      <Spacer />

      <Input
        placeholder={t('email.placeholder')}
        type="text"
        {...userEmailProps}
      />
    </Form>
  );
};
