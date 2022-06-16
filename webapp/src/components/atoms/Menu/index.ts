import { FC } from 'react';
import { Menu as MenuComponent, MenuProps } from './Menu';
import { MenuItem, MenuItemProps } from './MenuItem';

interface IMenu
  extends React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLButtonElement>> {
  Item: FC<MenuItemProps>;
}

export const Menu = {
  ...MenuComponent,
  Item: MenuItem,
} as IMenu;
