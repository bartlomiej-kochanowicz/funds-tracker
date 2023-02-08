import { Button, Input, Loader, RouterLink, Spacer, Text } from 'components/atoms';
import { FC, lazy, Suspense, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useInput } from 'hooks/useInput';
import { useMutation } from '@apollo/client';
import { SET_NEW_PASSWORD } from 'graphql/mutations';
import { SetNewPasswordMutation, SetNewPasswordMutationVariables } from '__generated__/graphql';
import { showErrorToast } from 'helpers/showToast';
import { ROUTES } from 'routes/paths';
import { validationSchema } from './EnterPassword.schema';
import { Form } from './EnterPassword.styles';

const GoogleReCaptcha = lazy(() =>
  import('react-google-recaptcha-v3').then(({ GoogleReCaptcha: component }) => ({
    default: component,
  })),
);

interface EnterPasswordFormProps {
  token: string;
}

export const EnterPasswordForm: FC<EnterPasswordFormProps> = ({ token: resetToken }) => {
  const { t } = useTranslation();

  const [newPasswordSuccess, setNewPasswordSuccess] = useState<boolean>(false);

  const [token, setToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

  const onVerify = useCallback(setToken, [setToken]);

  const defaultValues = {
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

  const userPasswordProps = useInput<typeof defaultValues>({
    register,
    name: 'userPassword',
    errors,
  });

  const userPasswordConfirmationProps = useInput<typeof defaultValues>({
    register,
    name: 'userPasswordConfirmation',
    errors,
  });

  const [setNewPasswordMutation] = useMutation<
    SetNewPasswordMutation,
    SetNewPasswordMutationVariables
  >(SET_NEW_PASSWORD, {
    onCompleted: () => {
      setNewPasswordSuccess(true);
    },
    onError: () => {
      const message = t('service.unknown_error');

      setError('userPassword', { type: 'custom', message });
      setError('userPasswordConfirmation', { type: 'custom', message: '‎' });
      showErrorToast(message);
    },
  });

  const onSubmit = async ({ userPassword }: typeof defaultValues) => {
    await setNewPasswordMutation({
      variables: {
        data: {
          token,
          resetToken,
          password: userPassword,
        },
      },
    });

    setRefreshReCaptcha(r => !r);
  };

  if (newPasswordSuccess) {
    return (
      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        <Trans
          i18nKey="page.forgot_password.enter_password.submit.success"
          components={{
            signin: (
              <RouterLink
                to={ROUTES.SIGNIN}
                fontColor="blue"
              />
            ),
          }}
        />
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
        placeholder={t('common.password')}
        type="password"
        autoFocus
        {...userPasswordProps}
      />

      <Spacer />

      <Input
        placeholder={t('page.signup.password.confirm')}
        type="password"
        {...userPasswordConfirmationProps}
      />

      <Spacer />

      <Button
        width="auto"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting && <Loader color="white" />}

        {!isSubmitting && t('common.save')}
      </Button>
    </Form>
  );
};

EnterPasswordForm.displayName = 'EnterPasswordForm';
