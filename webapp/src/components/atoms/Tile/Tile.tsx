import { RouterLink } from 'components/atoms/RouterLink';
import { Text } from 'components/atoms/Text';
import { FC, ReactNode } from 'react';

import { Box } from '../Box';
import { Spacer } from '../Spacer';
import { Wrapper } from './Tile.styles';

interface TilelProps {
  children: ReactNode;
  title?: string;
  to?: string;
}

export const Tile: FC<TilelProps> = ({ children, title, to }) => {
  const content = (
    <Box
      $flex
      $flexDirection="column"
    >
      <Wrapper>{children}</Wrapper>

      <Spacer $space="0.25" />

      {title && (
        <Text
          $maxWidth="55px"
          $fontSize="0.75"
          $fontWeight="700"
          $textAlign="center"
        >
          {title}
        </Text>
      )}
    </Box>
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
