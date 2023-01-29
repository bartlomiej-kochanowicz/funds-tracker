import { FC, ReactNode } from 'react';
import { Column } from 'simple-flexbox';
import { Text } from 'components/atoms/Text';
import { RouterLink } from 'components/atoms/RouterLink';
import { Wrapper } from './Tile.styles';
import { Spacer } from '../Spacer';

interface TilelProps {
  children: ReactNode;
  title?: string;
  to?: string;
}

export const Tile: FC<TilelProps> = ({ children, title, to }) => {
  const content = (
    <Column>
      <Wrapper>{children}</Wrapper>

      <Spacer space="tiny" />

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

  if (to) {
    return (
      <RouterLink
        to={to}
        textDecoration="none"
      >
        {content}
      </RouterLink>
    );
  }

  return content;
};
