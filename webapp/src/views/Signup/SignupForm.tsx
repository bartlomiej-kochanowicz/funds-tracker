import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Loader, Spacer } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import { StateMachine, useStateMachine } from 'hooks/useStateMachine';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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

      <Spacer />

      <Button
        color="black"
        width="auto"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting && <Loader color="white" />}

        {!isSubmitting && compareState(states.nameAndEmail) && t('next')}

        {!isSubmitting && compareState(states.passwords) && t('sign_up')}
      </Button>
    </Form>
  );
};
