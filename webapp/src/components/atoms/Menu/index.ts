import { FC } from 'react';
import { DefaultTheme, StyledComponent, StyledComponentBase } from 'styled-components';
import { ForwardRefComponent, HTMLMotionProps } from 'framer-motion';
import { Menu as MenuComponent, MenuProps } from './Menu';
import { MenuItem, MenuItemProps } from './MenuItem';
import { MenuDivider, MenuDividerProps } from './MenuDivider';

interface IMenu
  extends StyledComponentBase<
    ForwardRefComponent<HTMLUListElement, HTMLMotionProps<'ul'>>,
    DefaultTheme,
    MenuProps,
    never
  > {
  Item: FC<MenuItemProps>;
  Divider: StyledComponent<'hr', DefaultTheme, MenuDividerProps, never>;
}

export const Menu = {
  ...(MenuComponent as any),
  Item: MenuItem,
  Divider: MenuDivider,
} as IMenu;
