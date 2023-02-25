import { HeaderProps } from '../../types';

export const Header = <Item extends unknown>({ columns }: HeaderProps<Item>) => {
  return <div>header</div>;
};
