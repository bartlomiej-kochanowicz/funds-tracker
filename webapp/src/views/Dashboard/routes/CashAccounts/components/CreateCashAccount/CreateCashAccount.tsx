import { FC } from 'react';
import { Button, Spacer, Spreader, Heading } from 'components/atoms';
import { Panel } from 'components/molecules';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { useModalContext } from 'contexts/ModalContext';
import { MODAL_CREATE_CASH_ACCOUNT, CreateCashAccountModalProps } from 'modals/CreateCashAccount';

export const CreateCashAccount: FC = () => {
  const { t } = useTranslation();

  const { openModal } = useModalContext();

  const handleOpenModal = () => {
    openModal<CreateCashAccountModalProps>(MODAL_CREATE_CASH_ACCOUNT);
  };

  return (
    <Panel>
      <Panel.BodyCentered>
        <Heading
          textAlign="center"
          level="h2"
        >
          {t('page.cash_accounts.need.more')}
        </Heading>

        <Spacer space="small" />

        <Button onClick={handleOpenModal}>
          {t('page.cash_accounts.need.more.button')} <Spreader spread="tiny" /> <FaPlus />
        </Button>
      </Panel.BodyCentered>
    </Panel>
  );
};
