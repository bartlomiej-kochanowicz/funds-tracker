import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Loader, Spacer } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import useRequest from 'hooks/useRequest';
import { StateMachine, useStateMachine } from 'hooks/useStateMachine';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  signinCheckEmail,
  SigninCheckEmailProps,
  SigninCheckEmailResponse,
} from 'services/auth/signinCheckEmail';
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

  const { request: checkEmail } = useRequest<SigninCheckEmailProps, SigninCheckEmailResponse>(
    signinCheckEmail,
    {
      successCallback: () => updateState(actions.CHANGE_TO_PASSWORDS),
      failureCallback: error =>
        setError('userEmail', { type: 'custom', message: error.response?.data.message }),
    },
  );

  const onSubmit = async ({ userName, userEmail, userPassword }: typeof defaultValues) => {
    console.log({ userEmail, userPassword });

    if (compareState(states.nameAndEmail)) {
      checkEmail({ userEmail });
    }
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Input
        placeholder={t('common.name')}
        type="text"
        {...userNameProps}
      />

      <Spacer />

      <Input
        placeholder={t('common.email')}
        type="text"
        {...userEmailProps}
      />

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
