import { Avatar, Dropdown, Icon, Spreader, Text } from 'components/atoms';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { useUserContext } from 'contexts/UserContext';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

import { DropdownContent } from './components/DropdownContent';
import { ProfileContainer } from './Profile.styles';

interface ProfileProps {
  withName?: boolean;
}

export const Profile: FC<ProfileProps> = ({ withName = false }) => {
  const { user } = useUserContext();

  const { t } = useTranslation();

  const { isDark } = useColorThemeContext();

  return (
    <Dropdown
      content={DropdownContent}
      placement="bottom-end"
      triggerOffset={0}
    >
      {({ isOpen, ...rest }) => (
        <ProfileContainer {...rest}>
          {withName && (
            <Fragment>
              <Avatar name={user.name} />

              <Spreader spread="tiny" />

              <Text
                fontWeight="700"
                maxWidth="250px"
              >
                {t('common.hi')}, {user.name}!
              </Text>
            </Fragment>
          )}

          {!withName && <Avatar name={user.name} />}

          <Spreader spread="small" />

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
