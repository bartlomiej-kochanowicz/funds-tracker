import { SetNewPasswordMutation, SetNewPasswordMutationVariables } from '__generated__/graphql';
import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Loader, RouterLink, Spacer, Text } from 'components/atoms';
import { SET_NEW_PASSWORD } from 'graphql/mutations/authentication/SetNewPassword';
import { showErrorToast } from 'helpers/showToast';
import { ChangeEvent, FC, lazy, Suspense, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
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
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
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
    if (!token) {
      setRefreshReCaptcha(r => !r);

      onSubmit({ userPassword } as typeof defaultValues);

      return;
    }

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
        $fontSize="0.875"
        $fontColor="gray400"
        $textAlign="center"
      >
        <Trans
          i18nKey="page.forgot_password.enter_password.submit.success"
          components={{
            signin: (
              <RouterLink
                to={ROUTES.SIGNIN}
                $fontColor="blue"
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
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue('userPassword', e.target.value)}
        error={errors.userPassword?.message}
      />

      <Spacer />

      <Input
        placeholder={t('page.signup.password.confirm')}
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setValue('userPasswordConfirmation', e.target.value)
        }
        error={errors.userPasswordConfirmation?.message}
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
