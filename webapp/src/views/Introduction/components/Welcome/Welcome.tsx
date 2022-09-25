import { Button, Heading, Text } from 'components/atoms';
import { Column } from 'simple-flexbox';
import { useIntroductionContext } from 'views/Introduction/context';

export const Welcome = () => {
  const { updateState, actions } = useIntroductionContext();

  const handleNextStep = () => updateState(actions.CHANGE_TO_ADD_CASH_ACCOUNTS);

  return (
    <Column alignItems="center">
      <Heading textAlign="center">Welcome</Heading>

      <Text>No description idea for now</Text>

      <Button onClick={handleNextStep}>next step</Button>
    </Column>
  );
};

Welcome.displayName = 'IntroductionWelcome';
