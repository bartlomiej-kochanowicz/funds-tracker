import { Column } from 'simple-flexbox';
import { useTranslation } from 'react-i18next';
import { Button, Heading, Spacer, Text, ThumbUp } from 'components/atoms';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes';

export const FormSuccess = () => {
  const { t } = useTranslation();

  return (
    <Column alignItems="center">
      <ThumbUp />

      <Spacer space="large" />

      <Heading>{t('add.instrument.success.title')}</Heading>

      <Spacer space="small" />

      <Text
        fontSize="0.875"
        fontColor="darkGray"
        textAlign="center"
      >
        {t('add.instrument.success.description')}
      </Text>

      <Spacer space="large" />

      <Button
        color="black"
        width="100%"
        size="large"
        as={Link}
        to={ROUTES.MODEL_PORTFOLIO}
      >
        {t('add.instrument.success.start_manage')}
      </Button>
    </Column>
  );
};
