import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Button, Spacer, Input, Loader } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import { useStateMachine, StateMachine } from 'hooks/useStateMachine';
import useRequest from 'hooks/useRequest';
import {
  signinCheckEmail,
  SigninCheckEmailProps,
  SigninCheckEmailResponse,
} from 'services/auth/signinCheckEmail';
import { signin } from 'services/auth/signin';
import { AxiosError } from 'axios';
import { ROUTES } from 'routes';
import { showErrorToast } from 'helpers/showToast';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { accountThunk } from 'store/thunks/account/accountThunk';
import { validationSchema } from './Signin.schema';
import { Form } from './Signin.styles';

type FormStates = 'email' | 'password';

type FormActions = 'CHANGE_TO_PASSWORD';

const SigninStateMachine = new StateMachine<FormStates, FormActions>(
  'email',
  { email: 'email', password: 'password' },
  { CHANGE_TO_PASSWORD: 'CHANGE_TO_PASSWORD' },
  { email: { CHANGE_TO_PASSWORD: 'password' } },
);

export const SigninForm = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const { states, actions, updateState, compareState } = useStateMachine<FormStates, FormActions>(
    SigninStateMachine,
  );

  const defaultValues = { userEmail: '', userPassword: '' };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const { request: checkEmail } = useRequest<SigninCheckEmailProps, SigninCheckEmailResponse>(
    signinCheckEmail,
    {
      successCallback: ({ data }) => {
        if (data.exist) {
          updateState(actions.CHANGE_TO_PASSWORD);
        } else {
          setError('userEmail', {
            type: 'custom',
            message: t('page.signin.account.does_not_exist'),
          });
        }
      },
    },
  );

  const onSubmit = async ({ userEmail, userPassword }: typeof defaultValues) => {
    if (compareState(states.email)) {
      checkEmail({ userEmail });
    }

    if (compareState(states.password)) {
      try {
        await signin({ userEmail, userPassword });

        await dispatch(accountThunk());

        navigate(ROUTES.DASHBOARD);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;

        setError('userPassword', { type: 'custom', message: error.message });

        showErrorToast(t('service.unknown_error'));
      }
    }
  };

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
        placeholder={t('common.email')}
        type="email"
        disabled={compareState(states.password)}
        {...userEmailProps}
      />

      {compareState(states.password) && (
        <Fragment>
          <Spacer />

          <Input
            placeholder={t('common.password')}
            type="password"
            autoFocus
            {...userPasswordProps}
          />
        </Fragment>
      )}

      <Spacer />

      <Button
        color="black"
        width="auto"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting && <Loader color="white" />}

        {!isSubmitting && compareState(states.email) && t('common.next')}

        {!isSubmitting && compareState(states.password) && t('common.sign_in')}
      </Button>
    </Form>
  );
};
