import { Trans, useTranslation } from 'react-i18next';
import { Column, Row } from 'simple-flexbox';
import { Spacer, Heading, Text, RouterLink, ThemeSwitcher } from 'components/atoms';
import { ROUTES } from 'routes/paths';
import { LangSelector } from 'components/molecules';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { SigninForm } from './SigninForm';

export const Signin = () => {
  const { t } = useTranslation();

  return (
    <FullscreenClear>
      <Heading textAlign="center">{t('common.sign_in')}</Heading>

      <Spacer space="small" />

      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        {t('page.signin.description')}
      </Text>

      <Spacer space="large" />

      <SigninForm />

      <Spacer />

      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        <Trans
          i18nKey="page.signin.dont_have_account"
          components={{
            signup: (
              <RouterLink
                to={ROUTES.SIGNUP.SIGNUP}
                fontColor="blue"
              />
            ),
          }}
        />
      </Text>

      <Spacer space="small" />

      <Row justifyContent="center">
        <RouterLink
          to={ROUTES.RESET_PASSWORD}
          fontColor="blue"
          fontSize="0.875"
        >
          {t('page.signin.forgot_password')}
        </RouterLink>
      </Row>

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
