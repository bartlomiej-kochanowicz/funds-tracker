import { FC } from 'react';
import { Button, Spacer, Spreader, Heading } from 'components/atoms';
import { Panel } from 'components/molecules';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { useModalContext } from 'contexts/ModalContext';
import { MODAL_CREATE_CASH_ACCOUNT, CreateCashAccountModalProps } from 'modals/CreateCashAccount';
import { CreateCashAccountMutation } from '__generated__/graphql';

interface CreateCashAccountProps {
  callback: (data: CreateCashAccountMutation) => void;
}

export const CreateCashAccount: FC<CreateCashAccountProps> = ({ callback }) => {
  const { t } = useTranslation();

  const { openModal } = useModalContext();

  const handleOpenModal = () => {
    openModal<CreateCashAccountModalProps>(MODAL_CREATE_CASH_ACCOUNT, { callback });
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
