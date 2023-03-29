import NiceModal from '@ebay/nice-modal-react';
import { Menu } from 'components/atoms';
import { MODAL_CONFIRM_DELETE_PORTFOLIO } from 'modals/ConfirmDeletePortfolio';
import { MODAL_RENAME_PORTFOLIO } from 'modals/RenamePortfolio';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChartPie, FaPen, FaTrash } from 'react-icons/fa';

interface DropdownContentProps {
  handleToggle: () => void;
  uuid: string;
  name: string;
  updatePortfolioName: (data: { name: string; uuid: string }) => void;
  updatePortfolioList: (data: { uuid: string }) => void;
}

export const DropdownContent = forwardRef<HTMLUListElement, DropdownContentProps>(
  ({ handleToggle, uuid, name, updatePortfolioName, updatePortfolioList, ...rest }, ref) => {
    const { t } = useTranslation();

    const handleOpenRenameModal = () => {
      NiceModal.show(MODAL_RENAME_PORTFOLIO, {
        uuid,
        name,
        callback: updatePortfolioName,
      });

      handleToggle();
    };

    const handleOpenDeletePortfolioModal = () => {
      NiceModal.show(MODAL_CONFIRM_DELETE_PORTFOLIO, {
        name,
        uuid,
        callback: updatePortfolioList,
      });

      handleToggle();
    };

    return (
      <Menu
        ref={ref}
        minMenuWidth="270px"
        {...rest}
      >
        <Menu.Item icon={FaChartPie}>{t('common.manage')}</Menu.Item>

        <Menu.Divider />

        <Menu.Item
          icon={FaPen}
          onClick={handleOpenRenameModal}
        >
          {t('common.rename')}
        </Menu.Item>

        <Menu.Item
          icon={FaTrash}
          onClick={handleOpenDeletePortfolioModal}
        >
          {t('common.delete')}
        </Menu.Item>
      </Menu>
    );
  },
);
