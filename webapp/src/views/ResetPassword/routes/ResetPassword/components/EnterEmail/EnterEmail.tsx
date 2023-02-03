import { Heading, RouterLink, Spacer, Text } from 'components/atoms';
import { Fragment } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { ROUTES } from 'routes/paths';
import { EnterEmailForm } from './EnterEmailForm';

export const EnterEmail = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Heading textAlign="center">{t('page.signin.forgot_password')}</Heading>

      <Spacer space="small" />

      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        {t('page.forgot_password.enter_email.description')}
      </Text>

      <Spacer space="large" />

      <EnterEmailForm />

      <Spacer />

      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        <Trans
          i18nKey="page.signup.already_have_account"
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
    </Fragment>
  );
};

EnterEmail.displayName = 'EnterEmail';
