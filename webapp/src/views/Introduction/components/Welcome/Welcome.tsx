import { Button, Heading, Text } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import { Column } from 'simple-flexbox';
import { useIntroductionContext } from 'views/Introduction/context';

export const Welcome = () => {
  const { t } = useTranslation();

  const { updateState, actions } = useIntroductionContext();

  const handleNextStep = () => updateState(actions.CHANGE_TO_ADD_CASH_ACCOUNTS);

  return (
    <Column alignItems="center">
      <Heading textAlign="center">{t('common.welcome')}</Heading>

      <Text>No description idea for now</Text>

      <Button onClick={handleNextStep}>next step</Button>
    </Column>
  );
};

Welcome.displayName = 'IntroductionWelcome';
