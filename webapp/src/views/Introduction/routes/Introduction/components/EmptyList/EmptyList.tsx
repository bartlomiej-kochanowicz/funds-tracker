import { Button, Spacer, Spreader, Text } from 'components/atoms';
import { FaPlus } from 'react-icons/fa';
import { Column } from 'simple-flexbox';

interface EmptyListProps {
  handleAppend: () => void;
  i18n: {
    title: string;
    button: string;
  };
}

export const EmptyList = ({ handleAppend, i18n }: EmptyListProps) => (
  <Column alignItems="center">
    <Text
      textAlign="center"
      fontWeight="700"
    >
      {i18n.title}
    </Text>

    <Spacer space="tiny" />

    <Button
      color="secondary"
      onClick={handleAppend}
    >
      {i18n.button} <Spreader spread="tiny" /> <FaPlus />
    </Button>
  </Column>
);

EmptyList.displayName = 'AddCashAccountsEmptyList';
