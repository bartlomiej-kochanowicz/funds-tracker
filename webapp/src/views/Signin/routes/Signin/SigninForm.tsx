import { Fragment, lazy, Suspense, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Button, Spacer, Input, Loader } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import { useStateMachine, StateMachine } from 'hooks/useStateMachine';
import { ROUTES } from 'routes/paths';
import { EMAIL_EXIST } from 'graphql/query';
import { SIGNIN, SEND_CODE } from 'graphql/mutations';
import {
  EmailExistQuery,
  EmailExistQueryVariables,
  SendCodeMutation,
  SendCodeMutationVariables,
  SigninMutation,
  SigninMutationVariables,
} from '__generated__/graphql';
import { useUserContext } from 'contexts/UserContext';
import { showErrorToast, showSuccessToast } from 'helpers/showToast';
import { validationSchema } from './Signin.schema';
import { Form } from './Signin.styles';

const GoogleReCaptcha = lazy(() =>
  import('react-google-recaptcha-v3').then(({ GoogleReCaptcha: component }) => ({
    default: component,
  })),
);

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

  const { getUser } = useUserContext();

  const [token, setToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

  const navigate = useNavigate();

  const { states, actions, updateState, compareState } = useStateMachine<FormStates, FormActions>(
    SigninStateMachine,
  );

  const defaultValues = { userEmail: '', userPassword: '' };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema(compareState(states.password))),
  });

  const [emailExist] = useLazyQuery<EmailExistQuery, EmailExistQueryVariables>(EMAIL_EXIST, {
    onCompleted: data => {
      if (data?.emailExist?.exist) {
        updateState(actions.CHANGE_TO_PASSWORD);
      } else {
        setError('userEmail', {
          type: 'custom',
          message: t('page.signin.account.does_not_exist'),
        });
      }
    },
    onError: () => {
      showErrorToast(t('service.unknown_error'));
    },
  });

  const [sendCode] = useMutation<SendCodeMutation, SendCodeMutationVariables>(SEND_CODE, {
    onCompleted: async () => {
      showSuccessToast(t('toast.send_confirm_code.success'));
    },
    onError: () => {
      showErrorToast(t('toast.send_confirm_code.failure'));
    },
  });

  const [signin] = useMutation<SigninMutation, SigninMutationVariables>(SIGNIN, {
    onCompleted: async () => {
      await getUser();

      navigate(ROUTES.DASHBOARD.HOME);
    },
    onError: async error => {
      setError('userPassword', { type: 'custom', message: error.message });

      if (error.message === 'User not confirmed.') {
        const { userEmail } = getValues();

        await sendCode({ variables: { data: { email: userEmail, token } } });

        navigate(ROUTES.SIGNUP.CONFIRM, { state: { email: userEmail } });
      }
    },
  });

  const onVerify = useCallback(setToken, [setToken]);

  const onSubmit = async ({ userEmail, userPassword }: typeof defaultValues) => {
    if (compareState(states.email)) {
      await emailExist({ variables: { data: { email: userEmail, token } } });
    }

    if (compareState(states.password)) {
      await signin({ variables: { data: { email: userEmail, password: userPassword, token } } });
    }

    setRefreshReCaptcha(r => !r);
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

  const userNotConfirmed = errors.userPassword?.message === 'User not confirmed.';

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Suspense>
        <GoogleReCaptcha
          onVerify={onVerify}
          refreshReCaptcha={refreshReCaptcha}
        />
      </Suspense>

      <Input
        placeholder={t('common.email')}
        type="email"
        disabled={compareState(states.password)}
        data-testid="email-input"
        {...userEmailProps}
      />

      {compareState(states.password) && (
        <Fragment>
          <Spacer />

          <Input
            placeholder={t('common.password')}
            type="password"
            autoFocus
            data-testid="password-input"
            {...userPasswordProps}
          />
        </Fragment>
      )}

      <Spacer />

      <Button
        width="auto"
        disabled={isSubmitting}
        type="submit"
        data-testid="submit-button"
      >
        {isSubmitting && (
          <Loader
            color="white"
            data-testid="button-loader"
          />
        )}

        {!isSubmitting && compareState(states.email) && t('common.next')}

        {!isSubmitting && compareState(states.password) && !userNotConfirmed && t('common.sign_in')}

        {!isSubmitting &&
          compareState(states.password) &&
          userNotConfirmed &&
          t('common.sign_up_confirm')}
      </Button>
    </Form>
  );
};
