import { Heading, Spacer, Text } from 'components/atoms';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import { EnterPasswordForm } from './EnterPasswordForm';

interface EnterPasswordProps {
  token: string;
}

export const EnterPassword: FC<EnterPasswordProps> = ({ token }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Heading $textAlign="center">{t('page.forgot_password.enter_password.title')}</Heading>

      <Spacer $space="0.5" />

      <Text
        fontSize="0.875"
        $fontColor="gray400"
        $textAlign="center"
      >
        {t('page.forgot_password.enter_password.description')}
      </Text>

      <Spacer $space="1.5" />

      <EnterPasswordForm token={token} />
    </Fragment>
  );
};

EnterPassword.displayName = 'EnterPassword';
