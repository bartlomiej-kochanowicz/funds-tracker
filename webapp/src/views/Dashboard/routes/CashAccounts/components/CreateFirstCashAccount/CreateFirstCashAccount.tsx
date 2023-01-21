import { Button, Heading, Spacer, Spreader } from 'components/atoms';
import { useModalContext } from 'contexts/ModalContext';
import { CreateCashAccountModalProps, MODAL_CREATE_CASH_ACCOUNT } from 'modals/CreateCashAccount';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { Column } from 'simple-flexbox';

export const CreateFirstCashAccount = () => {
  const { t } = useTranslation();

  const { openModal } = useModalContext();

  const handleOpenModal = () => {
    openModal<CreateCashAccountModalProps>(MODAL_CREATE_CASH_ACCOUNT);
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
        {t('page.cash_accounts.need.more.button')} <Spreader spread="tiny" /> <FaPlus />
      </Button>
    </Column>
  );
};
