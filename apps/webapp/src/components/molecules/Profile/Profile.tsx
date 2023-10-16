import { LogoutMutation } from '__generated__/graphql';
import { useMutation } from '@apollo/client';
import { Avatar, Dropdown, Icon, Spreader, Text } from 'components/atoms';
import type { DropdownItems } from 'components/atoms/Dropdown';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { useUserContext } from 'contexts/UserContext';
import { LOGOUT } from 'graphql/mutations/authentication/Logout';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaChevronUp, FaSignOutAlt } from 'react-icons/fa';

import { ProfileContainer } from './Profile.styles';

interface ProfileProps {
  withName?: boolean;
}

export const Profile: FC<ProfileProps> = ({ withName = false }) => {
  const { user } = useUserContext();

  const { t } = useTranslation();

  const { isDark } = useColorThemeContext();

  const { clearUser: onCompleted } = useUserContext();

  const [logout] = useMutation<LogoutMutation>(LOGOUT, {
    onCompleted,
  });

  const handleSignOut = async () => {
    await logout();
  };

  const items = [
    {
      value: 'sign-out',
      icon: FaSignOutAlt,
      label: t('common.sign_out'),
      onClick: handleSignOut,
      divider: 'top',
    },
  ] satisfies DropdownItems;

  return (
    <Dropdown
      items={items}
      placement="bottom-end"
      triggerOffset={0}
    >
      {({ isOpen, ...rest }) => (
        <ProfileContainer {...rest}>
          {withName && (
            <Fragment>
              <Avatar name={user.name} />

              <Spreader $spread="0.25" />

              <Text
                $fontWeight="700"
                $maxWidth="250px"
              >
                {t('common.hi')}, {user.name}!
              </Text>
            </Fragment>
          )}

          {!withName && <Avatar name={user.name} />}

          <Spreader $spread="0.5" />

          <Icon
            icon={isOpen ? FaChevronUp : FaChevronDown}
            $size="0.875"
            $color={isDark ? 'white' : 'black'}
          />
        </ProfileContainer>
      )}
    </Dropdown>
  );
};
