import { useLazyQuery, useQuery } from '@apollo/client';
import { Heading, Spacer, Text } from 'components/atoms';
import { CHECK_RESET_TOKEN } from 'graphql/query';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import { FC, Fragment, lazy, Suspense, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { CheckResetTokenQuery, CheckResetTokenQueryVariables } from '__generated__/graphql';

const GoogleReCaptcha = lazy(() =>
  import('react-google-recaptcha-v3').then(({ GoogleReCaptcha: component }) => ({
    default: component,
  })),
);

interface EnterPasswordProps {
  token: string;
}

export const EnterPassword: FC<EnterPasswordProps> = ({ token }) => {
  const { t } = useTranslation();

  const [recaptchaToken, setRecaptchaToken] = useState<string>('');

  const onVerify = useCallback(setRecaptchaToken, [setRecaptchaToken]);

  const [checkResetToken, { loading, data, error, ...rest }] = useLazyQuery<
    CheckResetTokenQuery,
    CheckResetTokenQueryVariables
  >(CHECK_RESET_TOKEN);

  console.log(rest);

  useUpdateEffect(() => {
    if (token && recaptchaToken && !data && !error) {
      checkResetToken({
        variables: { data: { resetToken: token, token: recaptchaToken } },
      });
    }
  }, [token, recaptchaToken, data]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <Navigate to={ROUTES.RESET_PASSWORD} />;
  }

  return (
    <Suspense fallback={<div>loading...</div>}>
      <GoogleReCaptcha onVerify={onVerify} />

      <Heading textAlign="center">{t('page.forgot_password.enter_password.title')}</Heading>

      <Spacer space="small" />

      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        {t('page.forgot_password.enter_password.description', {
          name: data?.checkResetToken.name,
        })}
      </Text>

      <Spacer space="large" />

      <div>form</div>
    </Suspense>
  );
};

EnterPassword.displayName = 'EnterEmail';
