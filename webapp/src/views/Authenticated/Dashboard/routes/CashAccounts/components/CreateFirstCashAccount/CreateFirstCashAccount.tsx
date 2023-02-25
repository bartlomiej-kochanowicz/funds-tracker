import NiceModal from '@ebay/nice-modal-react';
import { Button, Heading, Icon, Spacer, Spreader } from 'components/atoms';
import { MODAL_CREATE_CASH_ACCOUNT } from 'modals/CreateCashAccount';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { Column } from 'simple-flexbox';
import { CreateCashAccountMutation } from '__generated__/graphql';

interface CreateFirstCashAccountProps {
  callback: (data: CreateCashAccountMutation) => void;
}

export const CreateFirstCashAccount: FC<CreateFirstCashAccountProps> = ({ callback }) => {
  const { t } = useTranslation();

  const handleOpenModal = () => {
    NiceModal.show(MODAL_CREATE_CASH_ACCOUNT, { callback });
  };

  return (
    <Column alignItems="center">
      <Heading
        textAlign="center"
        level="h2"
      >
        {t('page.cash_accounts.empty.list.title')}
      </Heading>

      <Spacer space="small" />

      <Button onClick={handleOpenModal}>
        {t('page.cash_accounts.need.more.button')}

        <Spreader spread="tiny" />

        <Icon icon={FaPlus} />
      </Button>
    </Column>
  );
};
