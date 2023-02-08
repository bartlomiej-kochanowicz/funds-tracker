import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Loader, Spacer, Text } from 'components/atoms';
import { RESET_PASSWORD } from 'graphql/mutations';
import { showErrorToast, showSuccessToast } from 'helpers/showToast';
import { useInput } from 'hooks/useInput';
import { lazy, Suspense, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ResetPasswordMutation, ResetPasswordMutationVariables } from '__generated__/graphql';
import { validationSchema } from './EnterEmail.schema';
import { Form } from './EnterEmail.styles';

const GoogleReCaptcha = lazy(() =>
  import('react-google-recaptcha-v3').then(({ GoogleReCaptcha: component }) => ({
    default: component,
  })),
);

export const EnterEmailForm = () => {
  const { t } = useTranslation();

  const [sendEmailSuccess, setSendEmailSuccess] = useState<boolean>(false);

  const [token, setToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

  const onVerify = useCallback(setToken, [setToken]);

  const defaultValues = { userEmail: '' };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  const [resetPassword] = useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(
    RESET_PASSWORD,
    {
      onCompleted: async () => {
        showSuccessToast(t('toast.send_reset_password_link.success'));

        setSendEmailSuccess(true);
      },
      onError: () => {
        showErrorToast(t('toast.send_reset_password_link.failure'));
      },
    },
  );

  const onSubmit = async ({ userEmail }: typeof defaultValues) => {
    await resetPassword({
      variables: {
        data: {
          email: userEmail,
          token,
        },
      },
    });

    setRefreshReCaptcha(r => !r);
  };

  const userEmailProps = useInput<typeof defaultValues>({
    register,
    name: 'userEmail',
    errors,
  });

  if (sendEmailSuccess) {
    return (
      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        {t('page.forgot_password.enter_email.submit.success')}
      </Text>
    );
  }

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
        data-testid="email-input"
        {...userEmailProps}
      />

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

        {!isSubmitting && t('page.forgot_password.enter_email.submit.button')}
      </Button>
    </Form>
  );
};

EnterEmailForm.displayName = 'EnterEmailForm';
