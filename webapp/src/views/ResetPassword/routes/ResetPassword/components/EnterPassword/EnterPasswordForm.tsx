import { Button, Input, Loader, Spacer } from 'components/atoms';
import { FC, lazy, Suspense, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useInput } from 'hooks/useInput';
import { Form } from './EnterPassword.styles';
import { validationSchema } from './EnterPassword.schema';

const GoogleReCaptcha = lazy(() =>
  import('react-google-recaptcha-v3').then(({ GoogleReCaptcha: component }) => ({
    default: component,
  })),
);

interface EnterPasswordFormProps {
  token: string;
}

export const EnterPasswordForm: FC<EnterPasswordFormProps> = ({ token: resetPasswordToken }) => {
  const { t } = useTranslation();

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

  const onSubmit = async ({ userPassword }: typeof defaultValues) => {
    setRefreshReCaptcha(r => !r);
  };

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
