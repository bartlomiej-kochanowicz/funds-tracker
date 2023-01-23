import { FC } from 'react';
import { Row } from 'simple-flexbox';
import { useTranslation } from 'react-i18next';
import { Spreader, Text, Avatar, Dropdown } from 'components/atoms';
import { useUserContext } from 'contexts/UserContext';
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
    >
      {withName && (
        <Row alignItems="center">
          <Avatar name={user.name} />

          <Spreader spread="tiny" />

          <Text fontWeight="700">
            {t('common.hi')}, {user.name}!
          </Text>
        </Row>
      )}

      {!withName && <Avatar name={user.name} />}
    </Dropdown>
  );
};
