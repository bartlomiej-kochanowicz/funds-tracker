import { Row } from 'simple-flexbox';
import { useSelector } from 'react-redux';
import { Spreader, Text } from 'components/atoms';
import { selectAccount } from 'store/selectors/account';
import { Avatar } from 'components/atoms/Avatar';

export const Profile = () => {
  const { data } = useSelector(selectAccount);

  return (
    <Row alignItems="center">
      <Avatar name={data.name} />

      <Spreader spread="small" />

      <Text fontWeight="700">Hi, {data.name}!</Text>
    </Row>
  );
};
