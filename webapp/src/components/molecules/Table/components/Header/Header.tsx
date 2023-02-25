import { Text } from 'components/atoms';

import { HeaderProps } from '../../types';
import { Wrapper } from './Header.styles';

export const Header = <Item extends unknown>({ columns }: HeaderProps<Item>) => {
  const gridTemplateColumns = columns.reduce((acc, { width }) => `${acc} ${width || '1fr'}`, '');

  return (
    <Wrapper gridTemplateColumns={gridTemplateColumns}>
      {columns.map(({ header, identifier }) => (
        <Text
          key={identifier}
          fontWeight="700"
        >
          {header}
        </Text>
      ))}
    </Wrapper>
  );
};
