import NiceModal from '@ebay/nice-modal-react';
import { Button, Heading, Icon, Spacer, Spreader } from 'components/atoms';
import { MODAL_CREATE_PORTFOLIO } from 'modals/CreatePortfolio';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { Column } from 'simple-flexbox';

interface CreateFirstPortfolioProps {
  callback: (data: any) => void;
}

export const CreateFirstPortfolio: FC<CreateFirstPortfolioProps> = ({ callback }) => {
  const { t } = useTranslation();

  const handleOpenModal = () => {
    NiceModal.show(MODAL_CREATE_PORTFOLIO, { callback });
  };

  return (
    <Column alignItems="center">
      <Heading
        textAlign="center"
        level="h2"
      >
        {t('page.portfolios.empty.list.title')}
      </Heading>

      <Spacer space="small" />

      <Button
        onClick={handleOpenModal}
        outline
      >
        {t('page.portfolios.need.more.button')}

        <Spreader spread="tiny" />

        <Icon icon={FaPlus} />
      </Button>
    </Column>
  );
};