import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Button, Heading, Spacer, Text } from 'components/atoms';
import { Column } from 'simple-flexbox';
import { useIntroductionContext } from 'views/Introduction/context';

export const Welcome = () => {
  const { t } = useTranslation();

  const { updateState, actions } = useIntroductionContext();

  const handleNextStep = () => updateState(actions.CHANGE_TO_ADD_CASH_ACCOUNTS);

  // dodać cofanie, animacje przejścia, tłumaczenia na stronie głownej

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <Column alignItems="center">
        <Heading textAlign="center">{t('common.welcome')}</Heading>

        <Spacer space="small" />

        <Text
          fontSize="0.875"
          fontColor="darkGray"
          textAlign="center"
        >
          {t('page.welcome.description')}
        </Text>

        <Spacer space="large" />

        <Button onClick={handleNextStep}>{t('page.welcome.button')}</Button>
      </Column>
    </motion.div>
  );
};

Welcome.displayName = 'IntroductionWelcome';
