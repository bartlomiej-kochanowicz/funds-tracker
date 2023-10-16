import { Menu as MenuComponent } from './Menu';
import { MenuDivider } from './MenuDivider';
import { MenuItem } from './MenuItem';

type MenuType = typeof MenuComponent;

interface IMenu extends MenuType {
  Item: typeof MenuItem;
  Divider: typeof MenuDivider;
}

export const Menu = {
  ...MenuComponent,
  Item: MenuItem,
  Divider: MenuDivider,
} as IMenu;
