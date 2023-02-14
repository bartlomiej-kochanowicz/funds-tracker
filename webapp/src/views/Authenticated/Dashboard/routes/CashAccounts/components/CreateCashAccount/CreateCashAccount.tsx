import { FC } from 'react';
import { Button, Spacer, Spreader, Heading, Icon } from 'components/atoms';
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
      <Panel.BodyCentered minHeight="216px">
        <Heading
          textAlign="center"
          level="h2"
        >
          {t('page.cash_accounts.need.more')}
        </Heading>

        <Spacer />

        <Button onClick={handleOpenModal}>
          {t('page.cash_accounts.need.more.button')}

          <Spreader spread="tiny" />

          <Icon icon={FaPlus} />
        </Button>
      </Panel.BodyCentered>
    </Panel>
  );
};
