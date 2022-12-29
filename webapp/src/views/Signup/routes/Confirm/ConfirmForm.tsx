import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Input, Spacer } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useUserContext } from 'contexts/UserContext';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { CONFIRM_SIGNUP } from 'graphql/mutations';
import { ConfirmSignupMutation, ConfirmSignupMutationVariables } from '__generated__/graphql';
import { ROUTES } from 'routes/paths';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { validationSchema } from './Confirm.schema';
import { Form } from './Confirm.styles';

interface ConfirmFormProps {
  email: string;
}

export const ConfirmForm: FC<ConfirmFormProps> = ({ email }) => {
  const { t } = useTranslation();

  const [token, setToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

  const onVerify = useCallback(setToken, [setToken]);

  const navigate = useNavigate();

  const { getUser } = useUserContext();

  const defaultValues = { code: '' };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  const [confirmSignup] = useMutation<ConfirmSignupMutation, ConfirmSignupMutationVariables>(
    CONFIRM_SIGNUP,
    {
      onCompleted: async () => {
        await getUser();

        navigate(ROUTES.INTRODUCTION);
      },
      onError: () => {
        setError('code', { type: 'custom', message: t('service.unknown_error') });
      },
    },
  );

  const onSubmit = async (data: typeof defaultValues) => {
    confirmSignup({ variables: { data: { code: data.code, email, token } } });

    setRefreshReCaptcha(r => !r);
  };

  const codeInputProps = useInput<typeof defaultValues>({
    register,
    name: 'code',
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
        placeholder={t('page.confirm.input.placeholder')}
        {...codeInputProps}
      />

      <Spacer />

      <Button
        width="auto"
        disabled={isSubmitting}
        type="submit"
        data-testid="submit-button"
      >
        {t('form.button.submit')}
      </Button>
    </Form>
  );
};
