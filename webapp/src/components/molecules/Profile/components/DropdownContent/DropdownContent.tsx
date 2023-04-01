import { LogoutMutation } from '__generated__/graphql';
import { useMutation } from '@apollo/client';
import { Icon, Menu, Spreader } from 'components/atoms';
import { useUserContext } from 'contexts/UserContext';
import { LOGOUT } from 'graphql/mutations/authentication/Logout';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa';

interface DropdownContentProps {
  handleToggle: () => void;
}

export const DropdownContent = forwardRef<HTMLUListElement, DropdownContentProps>(
  ({ handleToggle, ...rest }, ref) => {
    const { t } = useTranslation();

    const { clearUser: onCompleted } = useUserContext();

    const [logout] = useMutation<LogoutMutation>(LOGOUT, {
      onCompleted,
    });

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
        <Menu.Item>
          <Icon icon={FaUserAlt} />

          <Spreader spread="0.5" />

          {t('navigation.my_profile')}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item onClick={handleSignOut}>
          <Icon icon={FaSignOutAlt} />

          <Spreader spread="0.5" />

          {t('common.sign_out')}
        </Menu.Item>
      </Menu>
    );
  },
);
