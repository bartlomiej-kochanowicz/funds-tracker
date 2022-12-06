import { Fragment, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLazyQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Button, Spacer, Input, Loader } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import { useStateMachine, StateMachine } from 'hooks/useStateMachine';
import { ROUTES } from 'routes/paths';
import { EmailExist } from 'apollo/query';
import { Signin } from 'apollo/mutations';
import {
  EmailExistQuery,
  EmailExistQueryVariables,
  SigninMutation,
  SigninMutationVariables,
} from '__generated__/graphql';
import { useUserContext } from 'contexts/UserContext';
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
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema(compareState(states.password))),
  });

  const [emailExist] = useLazyQuery<EmailExistQuery, EmailExistQueryVariables>(EmailExist, {
    onCompleted: data => {
      if (data.emailExist.exist) {
        updateState(actions.CHANGE_TO_PASSWORD);
      } else {
        setError('userEmail', {
          type: 'custom',
          message: t('page.signin.account.does_not_exist'),
        });
      }
    },
  });

  const [signin] = useMutation<SigninMutation, SigninMutationVariables>(Signin, {
    onCompleted: async () => {
      await getUser();

      navigate(ROUTES.DASHBOARD.HOME);
    },
    onError: error => {
      setError('userPassword', { type: 'custom', message: error.message });
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

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <GoogleReCaptcha
        onVerify={onVerify}
        refreshReCaptcha={refreshReCaptcha}
      />

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

        {!isSubmitting && compareState(states.password) && t('common.sign_in')}
      </Button>
    </Form>
  );
};
