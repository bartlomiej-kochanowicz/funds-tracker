import { Heading, Spacer, Text } from 'components/atoms';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

interface EnterPasswordProps {
  token: string;
}

export const EnterPassword: FC<EnterPasswordProps> = ({ token }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Heading textAlign="center">{t('page.forgot_password.enter_password.title')}</Heading>
      <Spacer space="small" />
      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        {t('page.forgot_password.enter_password.description')}
      </Text>
      <Spacer space="large" />
      form
    </Fragment>
  );
};

EnterPassword.displayName = 'EnterEmail';
