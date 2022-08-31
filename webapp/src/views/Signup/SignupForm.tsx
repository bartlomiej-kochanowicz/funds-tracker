import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Loader, Spacer } from 'components/atoms';
import useRequest from 'hooks/useRequest';
import { StateMachine, useStateMachine } from 'hooks/useStateMachine';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  signinCheckEmail,
  SigninCheckEmailProps,
  SigninCheckEmailResponse,
} from 'services/auth/signinCheckEmail';
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

  const { states, actions, updateState, compareState } = useStateMachine<FormStates, FormActions>(
    SignupStateMachine,
  );

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
    resolver: yupResolver(validationSchema),
  });

  const { request: checkEmail } = useRequest<SigninCheckEmailProps, SigninCheckEmailResponse>(
    signinCheckEmail,
    {
      successCallback: ({ data }) => {
        if (data.exist) {
          setError('userEmail', { type: 'custom', message: t('page.signup.email.already_in_use') });
        } else {
          updateState(actions.CHANGE_TO_PASSWORDS);
        }
      },
    },
  );

  const onSubmit = async ({ userName, userEmail, userPassword }: typeof defaultValues) => {
    if (compareState(states.nameAndEmail)) {
      checkEmail({ userEmail });
    }

    if (compareState(states.passwords)) {
      // register here
      console.log('register');
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
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
        color="black"
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
