import { Heading, RouterLink, Spacer, Text, ThemeSwitcher } from 'components/atoms';
import { LangSelector } from 'components/molecules';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { Trans, useTranslation } from 'react-i18next';
import { ROUTES } from 'routes/paths';
import { Column, Row } from 'simple-flexbox';

import { SigninForm } from './SigninForm';

export const Signin = () => {
  const { t } = useTranslation();

  return (
    <FullscreenClear>
      <Heading $textAlign="center">{t('common.sign_in')}</Heading>

      <Spacer $space="0.5" />

      <Text
        fontSize="0.875"
        $fontColor="gray400"
        $textAlign="center"
      >
        {t('page.signin.description')}
      </Text>

      <Spacer $space="1.5" />

      <SigninForm />

      <Spacer />

      <Text
        fontSize="0.875"
        $fontColor="gray400"
        $textAlign="center"
      >
        <Trans
          i18nKey="page.signin.dont_have_account"
          components={{
            signup: (
              <RouterLink
                to={ROUTES.SIGNUP.SIGNUP}
                $fontColor="blue"
              />
            ),
          }}
        />
      </Text>

      <Spacer $space="0.5" />

      <Row justifyContent="center">
        <RouterLink
          to={ROUTES.RESET_PASSWORD}
          $fontColor="blue"
          fontSize="0.875"
        >
          {t('page.signin.forgot_password')}
        </RouterLink>
      </Row>

      <Spacer $space="1.5" />

      <Spacer $space="1.5" />

      <Column alignItems="center">
        <LangSelector />

        <Spacer />

        <ThemeSwitcher />
      </Column>
    </FullscreenClear>
  );
};
