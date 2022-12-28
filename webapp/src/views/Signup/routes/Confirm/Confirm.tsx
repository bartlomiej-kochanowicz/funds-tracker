import { Trans, useTranslation } from 'react-i18next';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { Heading, Link, Spacer, Text, ThemeSwitcher } from 'components/atoms';
import { Column } from 'simple-flexbox';
import { LangSelector } from 'components/molecules';
import { ConfirmForm } from './ConfirmForm';

export const Confirm = () => {
  const { t } = useTranslation();

  return (
    <FullscreenClear>
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
            email: 'dupa@gmail.com',
          }}
        />
      </Text>

      <Spacer space="large" />

      <ConfirmForm />

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
