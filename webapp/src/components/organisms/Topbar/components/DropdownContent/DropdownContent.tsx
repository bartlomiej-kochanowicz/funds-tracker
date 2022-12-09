import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu } from 'components/atoms';
import { useMutation } from '@apollo/client';
import { LOGOUT } from 'graphql/mutations';
import { LogoutMutation } from '__generated__/graphql';
// import { useUserContext } from 'contexts/UserContext';

interface DropdownContentProps {
  handleToggle: () => void;
}

export const DropdownContent = forwardRef<HTMLButtonElement, DropdownContentProps>(
  ({ handleToggle, ...rest }, ref) => {
    const { t } = useTranslation();

    // const { refetch } = useUserContext();

    const [logout] = useMutation<LogoutMutation>(LOGOUT);

    const handleSignOut = async () => {
      await logout();

      handleToggle();
    };

    return (
      <Menu
        minMenuWidth="270px"
        ref={ref}
        {...rest}
      >
        <Menu.Item padding="medium">{t('navigation.my_profile')}</Menu.Item>

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
