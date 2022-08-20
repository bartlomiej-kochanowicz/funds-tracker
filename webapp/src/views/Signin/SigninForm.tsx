import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Button, Spacer, Input, Loader } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import { AppDispatch } from 'store';
import { signinThunk } from 'store/thunks/auth/signinThunk';
import { useStateMachine, StateMachine } from 'hooks/useStateMachine';
import { selectSigninError, selectSigninStatus } from 'store/selectors/auth';
import useRequest from 'hooks/useRequest';
import {
  signinCheckEmail,
  SigninCheckEmailProps,
  SigninCheckEmailResponse,
} from 'services/auth/signinCheckEmail';
import { ROUTES } from 'routes';
import { useStatus } from 'hooks/useStatus';
import { validationSchema } from './Signin.schema';
import { Form } from './Signin.styles';

type FormStates = 'email' | 'password';

type FormActions = 'CHANGE_TO_PASSWORD';

const SignUpStateMachine = new StateMachine<FormStates, FormActions>(
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
    SignUpStateMachine,
  );

  const signinStatus = useSelector(selectSigninStatus);
  const errorMessage = useSelector(selectSigninError);

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
      successCallback: () => updateState(actions.CHANGE_TO_PASSWORD),
      failureCallback: error =>
        setError('userEmail', { type: 'custom', message: error.response?.data.message }),
    },
  );

  const onSubmit = async ({ userEmail, userPassword }: typeof defaultValues) => {
    if (compareState(states.email)) {
      checkEmail({ userEmail });
    }

    if (compareState(states.password)) await dispatch(signinThunk({ userEmail, userPassword }));
  };

  const { loading, loaded, rejected } = useStatus(signinStatus);

  if (!loading && loaded && !rejected) {
    navigate(ROUTES.DASHBOARD);
  }

  if (!loading && loaded && rejected) {
    setError('userEmail', { type: 'custom', message: errorMessage.message });
  }

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

      {compareState(states.password) && (
        <Fragment>
          <Spacer />

          <Input
            placeholder={t('password')}
            type="password"
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

        {!isSubmitting && compareState(states.email) && t('next')}

        {!isSubmitting && compareState(states.password) && t('sign_in')}
      </Button>
    </Form>
  );
};
