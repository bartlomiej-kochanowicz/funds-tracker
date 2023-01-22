import { FC, ReactNode } from 'react';
import { Column } from 'simple-flexbox';
import { Text } from 'components/atoms/Text';
import { Wrapper } from './Tile.styles';

interface TilelProps {
  children: ReactNode;
  title?: string;
}

export const Tile: FC<TilelProps> = ({ children, title }) => {
  return (
    <Column>
      <Wrapper>{children}</Wrapper>

      {title && (
        <Text
          maxWidth="55px"
          fontSize="0.75"
          fontWeight="700"
          textAlign="center"
        >
          {title}
        </Text>
      )}
    </Column>
  );
};
