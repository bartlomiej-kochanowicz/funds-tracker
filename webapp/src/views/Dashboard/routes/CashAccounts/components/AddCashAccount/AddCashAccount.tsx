import { FC } from 'react';
import { Button, Spacer, Spreader, Text } from 'components/atoms';
import { Panel } from 'components/molecules';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { useModalContext } from 'contexts/ModalContext';
import { ADD_CASH_ACCOUNT, AddCashAccountModalProps } from 'modals/AddCashAccount';

export const AddCashAccount: FC = () => {
  const { t } = useTranslation();

  const { openModal } = useModalContext();

  const handleOpenModal = () => {
    openModal<AddCashAccountModalProps>(ADD_CASH_ACCOUNT);
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