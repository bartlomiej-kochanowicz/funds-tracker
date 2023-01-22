import { Row } from 'simple-flexbox';
import { FaCog } from 'react-icons/fa';
import { Profile } from 'components/molecules';

export const Header = () => {
  return (
    <Row
      justifyContent="space-between"
      alignItems="center"
    >
      <FaCog size="1.5rem" />

      <Profile />
    </Row>
  );
};

Header.displayName = 'HubHeader';
