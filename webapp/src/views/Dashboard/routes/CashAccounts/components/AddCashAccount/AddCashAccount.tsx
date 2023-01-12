import { FC } from 'react';
import { Button, Spacer, Spreader, Text } from 'components/atoms';
import { Panel } from 'components/molecules';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { useModalsContext } from 'contexts/ModalsContext';

export const AddCashAccount: FC = () => {
  const { t } = useTranslation();

  const { openModal } = useModalsContext();

  const handleOpenModal = () => {
    openModal({ name: 'AddCashAccount' });
  };

  return (
    <Panel>
      <Panel.BodyCentered>
        <Text
          fontSize="1.25"
          fontWeight="700"
          textAlign="center"
        >
          {t('page.cash_accounts.need.more')}
        </Text>

        <Spacer space="small" />

        <Button onClick={handleOpenModal}>
          {t('page.cash_accounts.need.more.button')} <Spreader spread="tiny" /> <FaPlus />
        </Button>
      </Panel.BodyCentered>
    </Panel>
  );
};
