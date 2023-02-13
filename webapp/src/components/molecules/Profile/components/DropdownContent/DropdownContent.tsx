import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon, Menu, Spreader } from 'components/atoms';
import { useMutation } from '@apollo/client';
import { LOGOUT } from 'graphql/mutations';
import { LogoutMutation } from '__generated__/graphql';
import { useUserContext } from 'contexts/UserContext';
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

          <Spreader spread="small" />

          {t('navigation.my_profile')}
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item onClick={handleSignOut}>
          <Icon icon={FaSignOutAlt} />

          <Spreader spread="small" />

          {t('common.sign_out')}
        </Menu.Item>
      </Menu>
    );
  },
);
