import { Row } from 'simple-flexbox';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Spreader, Text } from 'components/atoms';
import { selectAccount } from 'store/selectors/account';
import { Avatar } from 'components/atoms/Avatar';

export const Profile = () => {
  const { data } = useSelector(selectAccount);

  const { t } = useTranslation();

  return (
    <Row alignItems="center">
      <Avatar name={data.name} />

      <Spreader spread="small" />

      <Text fontWeight="700">
        {t('common.hi')}, {data.name}!
      </Text>
    </Row>
  );
};
