import { Trans, useTranslation } from 'react-i18next';
import { Heading, Link, Spacer, Text } from 'components/atoms';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { Row } from 'simple-flexbox';
import { LangSelector } from 'components/molecules';
import { ROUTES } from 'routes/paths';
import { SignupForm } from './SignupForm';

export const Signup = () => {
  const { t } = useTranslation();

  return (
    <FullscreenClear>
      <Heading textAlign="center">{t('common.sign_up')}</Heading>

      <Spacer space="small" />

      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="center"
      >
        {t('page.signup.description')}
      </Text>

      <Spacer space="large" />

      <SignupForm />

      <Spacer />

      <Text
        fontSize="0.875"
        fontColor="gray400"
        textAlign="right"
      >
        <Trans
          i18nKey="page.signup.already_have_account"
          components={{
            signin: (
              <Link
                to={ROUTES.SIGNIN}
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
