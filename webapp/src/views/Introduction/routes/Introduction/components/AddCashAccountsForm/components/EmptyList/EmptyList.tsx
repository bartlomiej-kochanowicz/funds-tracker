import { Button, Spacer, Spreader, Text } from 'components/atoms';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { Column } from 'simple-flexbox';

interface EmptyListProps {
  handleAppend: () => void;
}

export const EmptyList = ({ handleAppend }: EmptyListProps) => {
  const { t } = useTranslation();

  return (
    <Column alignItems="center">
      <Text
        textAlign="center"
        fontWeight="700"
      >
        {t('add.cash.accounts.empty')}
      </Text>

      <Spacer space="tiny" />

      <Button
        color="black"
        onClick={handleAppend}
      >
        {t('add.cash.accounts.button.add')} <Spreader spread="tiny" /> <FaPlus />
      </Button>
    </Column>
  );
};

EmptyList.displayName = 'AddCashAccountsEmptyList';
