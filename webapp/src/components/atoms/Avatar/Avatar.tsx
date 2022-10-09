import { Text } from 'components/atoms/Text';
import { Circle } from './Avatar.styles';

interface AvatarProps {
  name: string;
}

export const Avatar = ({ name }: AvatarProps) => {
  console.log(name);

  return (
    <Circle
      justifyContent="center"
      alignItems="center"
    >
      <Text
        fontColor="white"
        fontSize="1.25"
      >
        BK
      </Text>
    </Circle>
  );
};
