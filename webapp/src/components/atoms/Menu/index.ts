import { FC } from 'react';
import { DefaultTheme, StyledComponent } from 'styled-components';
import { Menu as MenuComponent, MenuProps } from './Menu';
import { MenuItem, MenuItemProps } from './MenuItem';
import { MenuDivider, MenuDividerProps } from './MenuDivider';

interface IMenu
  extends React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLButtonElement>> {
  Item: FC<MenuItemProps>;
  Divider: StyledComponent<'hr', DefaultTheme, MenuDividerProps, never>;
}

export const Menu = {
  ...MenuComponent,
  Item: MenuItem,
  Divider: MenuDivider,
} as IMenu;
