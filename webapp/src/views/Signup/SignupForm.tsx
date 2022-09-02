import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Loader, Spacer } from 'components/atoms';
import useRequest from 'hooks/useRequest';
import { StateMachine, useStateMachine } from 'hooks/useStateMachine';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { checkEmail, CheckEmailProps, CheckEmailResponse } from 'services/auth/checkEmail';
import { signup } from 'services/auth/signup';
import { AppDispatch } from 'store';
import { accountThunk } from 'store/thunks/account/accountThunk';
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

  const dispatch = useDispatch<AppDispatch>();

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

  const { request: checkEmailRequest } = useRequest<CheckEmailProps, CheckEmailResponse>(
    checkEmail,
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

  const onSubmit = async ({
    userName,
    userEmail,
    userPassword,
    userPasswordConfirmation,
  }: typeof defaultValues) => {
    if (compareState(states.nameAndEmail)) {
      checkEmailRequest({ userEmail });
    }

    if (compareState(states.passwords)) {
      try {
        await signup({ userName, userEmail, userPassword });

        await dispatch(accountThunk());

        // navigate(ROUTES.DASHBOARD);
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;

        setError('userPassword', { type: 'custom', message: error.message });

        showErrorToast(t('service.unknown_error'));
      }
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
