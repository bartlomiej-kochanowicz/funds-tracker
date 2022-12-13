import { useLazyQuery, useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { SIGNUP } from 'graphql/mutations';
import { EMAIL_EXIST } from 'graphql/query';
import { Button, Loader, Spacer } from 'components/atoms';
import { useUserContext } from 'contexts/UserContext';
import { showErrorToast } from 'helpers/showToast';
import { StateMachine, useStateMachine } from 'hooks/useStateMachine';
import { useCallback, useState } from 'react';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import {
  EmailExistQuery,
  EmailExistQueryVariables,
  SignupMutation,
  SignupMutationVariables,
} from '__generated__/graphql';
import { NameAndEmail } from './components/NameAndEmail';
import { Passwords } from './components/Passwords';
import { validationSchema } from './Signup.schema';
import { Form } from './Signup.styles';

type FormStates = 'nameAndEmail' | 'passwords';

type FormActions = 'CHANGE_TO_PASSWORDS';

const SignupStateMachine = new StateMachine<FormStates, FormActions>(
  'nameAndEmail',
  { nameAndEmail: 'nameAndEmail', passwords: 'passwords' },
  { CHANGE_TO_PASSWORDS: 'CHANGE_TO_PASSWORDS' },
  { nameAndEmail: { CHANGE_TO_PASSWORDS: 'passwords' } },
);

export const SignupForm = () => {
  const { t } = useTranslation();

  const { getUser } = useUserContext();

  const [token, setToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

  const { states, actions, updateState, compareState } = useStateMachine<FormStates, FormActions>(
    SignupStateMachine,
  );

  const navigate = useNavigate();

  const defaultValues = {
    userName: '',
    userEmail: '',
    userPassword: '',
    userPasswordConfirmation: '',
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema(compareState(states.passwords))),
  });

  const [emailExist] = useLazyQuery<EmailExistQuery, EmailExistQueryVariables>(EMAIL_EXIST, {
    onCompleted: data => {
      if (data.emailExist.exist) {
        setError('userEmail', { type: 'custom', message: t('page.signup.email.already_in_use') });
      } else {
        updateState(actions.CHANGE_TO_PASSWORDS);
      }
    },
  });

  const [signup] = useMutation<SignupMutation, SignupMutationVariables>(SIGNUP, {
    onCompleted: async () => {
      await getUser();

      navigate(ROUTES.INTRODUCTION);
    },
    onError: () => {
      setError('userPassword', { type: 'custom', message: t('service.unknown_error') });
      setError('userPasswordConfirmation', {
        type: 'custom',
        message: '',
      });
    },
  });

  const onVerify = useCallback(setToken, [setToken]);

  const onSubmit = async ({ userName, userEmail, userPassword }: typeof defaultValues) => {
    if (compareState(states.nameAndEmail)) {
      emailExist({ variables: { data: { email: userEmail, token } } });
    }

    if (compareState(states.passwords)) {
      try {
        await signup({
          variables: { data: { name: userName, email: userEmail, password: userPassword, token } },
        });
      } catch {
        showErrorToast(t('service.unknown_error'));
      }
    }

    setRefreshReCaptcha(r => !r);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <GoogleReCaptcha
        onVerify={onVerify}
        refreshReCaptcha={refreshReCaptcha}
      />

      {compareState(states.nameAndEmail) && (
        <NameAndEmail
          register={register}
          errors={errors}
        />
      )}

      {compareState(states.passwords) && (
        <Passwords
          register={register}
          errors={errors}
        />
      )}

      <Spacer />

      <Button
        width="auto"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting && <Loader color="white" />}

        {!isSubmitting && compareState(states.nameAndEmail) && t('common.next')}

        {!isSubmitting && compareState(states.passwords) && t('common.sign_up')}
      </Button>
    </Form>
  );
};
