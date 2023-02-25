import { Text } from 'components/atoms/Text';
import { Initials } from 'helpers/Initials';
import { useMemo } from 'react';

import { Circle } from './Avatar.styles';

interface AvatarProps {
  name: string;
}

export const Avatar = ({ name }: AvatarProps) => {
  const initials = useMemo(() => new Initials(name), [name]);

  return (
    <Circle
      justifyContent="center"
      alignItems="center"
    >
      <Text
        fontColor="white"
        fontSize="1.25"
      >
        {initials.getInitials()}
      </Text>
    </Circle>
  );
};
