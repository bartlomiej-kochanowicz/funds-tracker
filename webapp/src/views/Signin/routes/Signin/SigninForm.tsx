import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { Button, Spacer, Input, Loader } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import { useStateMachine, StateMachine } from 'hooks/useStateMachine';
import useRequest from 'hooks/useRequest';
import { checkEmail, CheckEmailProps, CheckEmailResponse } from 'services/auth/checkEmail';
import { signin, SigninProps } from 'services/auth/signin';
import { ROUTES } from 'routes/paths';
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
    resolver: yupResolver(validationSchema(compareState(states.password))),
  });

  const { request: checkEmailRequest } = useRequest<CheckEmailProps, CheckEmailResponse>(
    checkEmail,
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

  const { request: signinRequest } = useRequest<SigninProps, undefined>(signin, {
    successCallback: async () => {
      await dispatch(accountThunk());

      navigate(ROUTES.DASHBOARD.HOME);
    },
    failureCallback: error => {
      setError('userPassword', { type: 'custom', message: error.message });
    },
  });

  const onSubmit = async ({ userEmail, userPassword }: typeof defaultValues) => {
    if (compareState(states.email)) {
      await checkEmailRequest({ userEmail });
    }

    if (compareState(states.password)) {
      await signinRequest({ userEmail, userPassword });
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
