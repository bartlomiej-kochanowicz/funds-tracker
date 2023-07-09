import { Box, Heading, Spacer } from 'components/atoms';
import { useTranslation } from 'react-i18next';

export const PleaseSelectInstrumentType = () => {
  const { t } = useTranslation();

  return (
    <Box
      flex
      flexDirection="column"
    >
      <Spacer space="0.5" />

      <Heading
        level="h2"
        fontColor="gray300"
        textAlign="center"
      >
        {t('modal.InvestFunds.form.please.select.instrumentType.to.continue')}
      </Heading>
    </Box>
  );
};
