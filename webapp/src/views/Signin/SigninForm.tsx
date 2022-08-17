import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Button, Spacer, Input, Loader } from 'components/atoms';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import { useInput } from 'hooks/useInput';
import { AppDispatch } from 'store';
import { signinThunk } from 'store/thunks/auth/signinThunk';
import { useStateMachine, StateMachine } from 'hooks/useStateMachine';
import { selectSigninError, selectSigninStatus } from 'store/selectors/auth';
import useRequest from 'hooks/useRequest';
import { signinCheckEmail, SigninCheckEmailResponse } from 'services/auth/signinCheckEmail';
import { ROUTES } from 'routes';
import { validationSchema } from './Signin.schema';
import { Form } from './Signin.styles';

type FormStates = 'email' | 'password';

type FormActions = 'CHANGE_TO_PASSWORD';

export const SigninForm = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const data = useStateMachine<FormStates, FormActions>(
    new StateMachine<FormStates, FormActions>(
      'email',
      { email: 'email', password: 'password' },
      { CHANGE_TO_PASSWORD: 'CHANGE_TO_PASSWORD' },
      { email: { CHANGE_TO_PASSWORD: 'password' } },
    ),
  );

  console.log(data);

  const fetchSigninEmailCheck = () => signinCheckEmail({ userEmail: 'test@gmail.com' });

  const { request: checkEmail } = useRequest<SigninCheckEmailResponse>(fetchSigninEmailCheck, {
    errorToast: 'wyjabało sie',
  });

  const signinStatus = useSelector(selectSigninStatus);
  const errorMessage = useSelector(selectSigninError);

  const defaultValues = { userEmail: '', userPassword: '' };

  const onSubmit = async ({ userEmail, userPassword }: typeof defaultValues) => {
    await dispatch(signinThunk({ userEmail, userPassword }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  // handle async redux action
  useUpdateEffect(() => {
    if (signinStatus === 'fulfilled') {
      navigate(ROUTES.DASHBOARD);
    }

    if (signinStatus === 'rejected') {
      setError('userEmail', { type: 'custom', message: errorMessage.message });
    }
  }, [signinStatus]);

  const userEmailProps = useInput<typeof defaultValues>({
    register,
    name: 'userEmail',
    errors,
  });

  const userPasswordProps = useInput<typeof defaultValues>({
    register,
    name: 'userPassword',
    errors,
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Input
        placeholder={t('page.signin.email.placeholder')}
        type="email"
        {...userEmailProps}
      />

      <Spacer />

      <Input
        placeholder={t('password')}
        type="password"
        {...userPasswordProps}
      />

      <Spacer />

      <Button
        color="black"
        width="auto"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? <Loader color="white" /> : t('sign_in')}
      </Button>
    </Form>
  );
};
