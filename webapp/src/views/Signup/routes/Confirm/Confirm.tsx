import { useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useLocation, Navigate } from 'react-router-dom';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { ButtonLink, Heading, Link, Spacer, Text, ThemeSwitcher } from 'components/atoms';
import { Column } from 'simple-flexbox';
import { LangSelector } from 'components/molecules';
import { ROUTES } from 'routes/paths';
import { SEND_CODE } from 'graphql/mutations/SendCode';
import { useMutation } from '@apollo/client';
import { showErrorToast, showSuccessToast } from 'helpers/showToast';
import { SendCodeMutation, SendCodeMutationVariables } from '__generated__/graphql';
import { GoogleReCaptcha } from 'react-google-recaptcha-v3';
import { ConfirmForm } from './ConfirmForm';

type LocationState = {
  email: string;
};

export const Confirm = () => {
  const { t } = useTranslation();

  const [token, setToken] = useState<string>('');
  const [refreshReCaptcha, setRefreshReCaptcha] = useState<boolean>(false);

  const onVerify = useCallback(setToken, [setToken]);

  const location = useLocation();

  location.state = {};

  const { email } = location.state as LocationState;

  const [sendCode] = useMutation<SendCodeMutation, SendCodeMutationVariables>(SEND_CODE, {
    onCompleted: async () => {
      showSuccessToast('dupa');
    },
    onError: () => {
      showErrorToast('error elo');
    },
  });

  const handleResendCode = useCallback(async () => {
    await sendCode({ variables: { data: { email, token } } });

    setRefreshReCaptcha(r => !r);
  }, [sendCode, email, token]);

  if (!email) {
    return (
      <Navigate
        to={ROUTES.SIGNIN}
        replace
      />
    );
  }

  return (
    <FullscreenClear>
      <GoogleReCaptcha
        onVerify={onVerify}
        refreshReCaptcha={refreshReCaptcha}
      />

      <Heading textAlign="center">{t('common.sign_up_confirm')}</Heading>

      <Spacer space="small" />

      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        <Trans
          i18nKey="page.confirm.description"
          components={{
            bold: (
              <Text
                fontSize="0.875"
                fontColor="gray400"
                textAlign="center"
                fontWeight="700"
              />
            ),
          }}
          values={{
            email,
          }}
        />
      </Text>

      <Spacer space="large" />

      <ConfirmForm email={email} />

      <Spacer />

      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        <Trans
          i18nKey="page.confirm.support"
          components={{
            support: (
              <Link
                href="mailto:support@funds-tracker.com"
                fontColor="blue"
              />
            ),
            code: (
              <ButtonLink
                onClick={handleResendCode}
                fontColor="blue"
              />
            ),
          }}
        />
      </Text>

      <Spacer space="large" />

      <Spacer space="large" />

      <Spacer space="large" />

      <Column alignItems="center">
        <LangSelector />

        <Spacer />

        <ThemeSwitcher />
      </Column>
    </FullscreenClear>
  );
};
