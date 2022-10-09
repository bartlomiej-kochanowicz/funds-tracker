import { Row } from 'simple-flexbox';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Spreader, Text, Avatar, Dropdown } from 'components/atoms';
import { selectAccount } from 'store/selectors/account';
import { DropdownContent } from '../DropdownContent';

export const Profile = () => {
  const { data } = useSelector(selectAccount);

  const { t } = useTranslation();

  return (
    <Dropdown
      content={DropdownContent}
      placement="bottom-end"
    >
      <Row alignItems="center">
        <Avatar name={data.name} />

        <Spreader spread="tiny" />

        <Text fontWeight="700">
          {t('common.hi')}, {data.name}!
        </Text>
      </Row>
    </Dropdown>
  );
};
