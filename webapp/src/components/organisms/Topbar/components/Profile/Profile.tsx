import { Row } from 'simple-flexbox';
import { useTranslation } from 'react-i18next';
import { Spreader, Text, Avatar, Dropdown } from 'components/atoms';
import { useUserContext } from 'contexts/UserContext';
import { DropdownContent } from '../DropdownContent';

export const Profile = () => {
  const { user } = useUserContext();

  const { t } = useTranslation();

  return (
    <Dropdown
      content={DropdownContent}
      placement="bottom-end"
    >
      <Row alignItems="center">
        <Avatar name={user.name} />

        <Spreader spread="tiny" />

        <Text fontWeight="700">
          {t('common.hi')}, {user.name}!
        </Text>
      </Row>
    </Dropdown>
  );
};
