import { FaCog } from 'react-icons/fa';
import { Profile } from 'components/molecules';
import { Wrapper } from './MobileTopbar.styles';

export const MobileTopbar = () => {
  return (
    <Wrapper
      justifyContent="space-between"
      alignItems="center"
    >
      <FaCog size="1.5rem" />

      <Profile />
    </Wrapper>
  );
};

MobileTopbar.displayName = 'MobileTopbar';
