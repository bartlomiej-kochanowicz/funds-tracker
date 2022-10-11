import { Trans, useTranslation } from 'react-i18next';
import { Row } from 'simple-flexbox';
import { Spacer, Heading, Text, Link } from 'components/atoms';
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
        textAlign="right"
      >
        <Trans
          i18nKey="page.signin.dont_have_account"
          components={{
            signup: (
              <Link
                to={ROUTES.SIGNUP}
                fontColor="blue"
              />
            ),
          }}
        />
      </Text>

      <Spacer space="large" />

      <Spacer space="large" />

      <Spacer space="large" />

      <Row justifyContent="center">
        <LangSelector />
      </Row>
    </FullscreenClear>
  );
};
