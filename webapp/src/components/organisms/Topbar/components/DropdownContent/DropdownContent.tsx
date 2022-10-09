import { forwardRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AppDispatch } from 'store';
import { logoutThunk } from 'store/thunks/account/logoutThunk';
import { Menu } from 'components/atoms';

interface DropdownContentProps {
  handleToggle: () => void;
}

export const DropdownContent = forwardRef<HTMLButtonElement, DropdownContentProps>(
  ({ handleToggle, ...rest }, ref) => {
    const { t } = useTranslation();

    const dispatch = useDispatch<AppDispatch>();

    const handleSignOut = () => {
      dispatch(logoutThunk());

      handleToggle();
    };

    return (
      <Menu
        minMenuWidth="270px"
        ref={ref}
        {...rest}
      >
        <Menu.Item padding="medium">{t('sidebar.navigation.my_profile')}</Menu.Item>

        <Menu.Divider width="85%" />

        <Menu.Item
          padding="medium"
          onClick={handleSignOut}
        >
          {t('common.sign_out')}
        </Menu.Item>
      </Menu>
    );
  },
);
