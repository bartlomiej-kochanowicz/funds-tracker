import { useTranslation } from 'react-i18next';
import { Heading, Spacer, Text } from 'components/atoms';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { Row } from 'simple-flexbox';
import { LangSelector } from 'components/molecules/LangSelector';

export const Signup = () => {
  const { t } = useTranslation();

  <FullscreenClear>
    <Heading textAlign="center">{t('sign_up')}</Heading>

    <Spacer space="small" />

    <Text
      fontSize="0.875"
      fontColor="darkGray"
      textAlign="left"
    >
      {t('test', {})}
      Don't have account? Signup here
    </Text>

    <Spacer space="small" />

    <Text
      fontSize="0.875"
      fontColor="darkGray"
      textAlign="center"
    >
      {t('page.signup.description')}
    </Text>

    <Spacer space="large" />

    <Spacer space="large" />

    <Spacer space="large" />

    <Spacer space="large" />

    <Row justifyContent="center">
      <LangSelector />
    </Row>
  </FullscreenClear>;
};
