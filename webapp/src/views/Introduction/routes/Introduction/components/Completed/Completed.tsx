import { Box, Button, Heading, Spacer, Text, ThumbUp } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes/paths';

export const Completed = () => {
  const { t } = useTranslation();

  return (
    <Box
      $flex
      $flexDirection="column"
      $alignItems="center"
    >
      <ThumbUp />

      <Spacer $space="1.5" />

      <Heading>{t('add.instrument.success.title')}</Heading>

      <Spacer $space="0.5" />

      <Text
        $fontSize="0.875"
        $fontColor="gray400"
        $textAlign="center"
      >
        {t('add.instrument.success.description')}
      </Text>

      <Spacer $space="1.5" />

      <Button
        color="secondary"
        width="100%"
        size="large"
        as={Link}
        to={ROUTES.DASHBOARD}
      >
        {t('add.instrument.success.dashboard')}
      </Button>
    </Box>
  );
};
