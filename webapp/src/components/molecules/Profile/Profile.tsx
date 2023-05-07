import { Avatar, Dropdown, Icon, Spreader, Text } from 'components/atoms';
import type { DropdownItems } from 'components/atoms/Dropdown';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { useUserContext } from 'contexts/UserContext';
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

  const items = [
    {
      value: 'sign-out',
      icon: FaSignOutAlt,
      label: t('common.sign_out'),
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

              <Spreader spread="0.25" />

              <Text
                fontWeight="700"
                maxWidth="250px"
              >
                {t('common.hi')}, {user.name}!
              </Text>
            </Fragment>
          )}

          {!withName && <Avatar name={user.name} />}

          <Spreader spread="0.5" />

          <Icon
            icon={isOpen ? FaChevronUp : FaChevronDown}
            size="0.875"
            color={isDark ? 'white' : 'black'}
          />
        </ProfileContainer>
      )}
    </Dropdown>
  );
};
