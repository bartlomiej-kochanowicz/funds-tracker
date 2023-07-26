import { Heading, RouterLink, Spacer, Text, ThemeSwitcher } from 'components/atoms';
import { LangSelector } from 'components/molecules';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { Trans, useTranslation } from 'react-i18next';
import { ROUTES } from 'routes/paths';
import { Column } from 'simple-flexbox';

import { SignupForm } from './SignupForm';

export const Signup = () => {
  const { t } = useTranslation();

  return (
    <FullscreenClear>
      <Heading $textAlign="center">{t('common.sign_up')}</Heading>

      <Spacer $space="0.5" />

      <Text
        fontSize="0.875"
        $fontColor="gray400"
        $textAlign="center"
      >
        {t('page.signup.description')}
      </Text>

      <Spacer $space="1.5" />

      <SignupForm />

      <Spacer />

      <Text
        fontSize="0.875"
        $fontColor="gray400"
        $textAlign="center"
      >
        <Trans
          i18nKey="page.signup.already_have_account"
          components={{
            signin: (
              <RouterLink
                to={ROUTES.SIGNIN}
                $fontColor="blue"
              />
            ),
          }}
        />
      </Text>

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
