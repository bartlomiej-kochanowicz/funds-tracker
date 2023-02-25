import { Avatar, Dropdown, Spreader, Text } from 'components/atoms';
import { useUserContext } from 'contexts/UserContext';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Row } from 'simple-flexbox';

import { DropdownContent } from './components/DropdownContent';

interface ProfileProps {
  withName?: boolean;
}

export const Profile: FC<ProfileProps> = ({ withName = false }) => {
  const { user } = useUserContext();

  const { t } = useTranslation();

  return (
    <Dropdown
      content={DropdownContent}
      placement="bottom-end"
      triggerOffset={0}
    >
      {withName && (
        <Row alignItems="center">
          <Avatar name={user.name} />

          <Spreader spread="tiny" />

          <Text
            fontWeight="700"
            maxWidth="250px"
          >
            {t('common.hi')}, {user.name}!
          </Text>
        </Row>
      )}

      {!withName && <Avatar name={user.name} />}
    </Dropdown>
  );
};
