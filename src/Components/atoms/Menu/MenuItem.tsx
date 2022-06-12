import { FC, ReactNode } from 'react';

export interface MenuItemProps {
  children: ReactNode;
}

export const MenuItem: FC<MenuItemProps> = ({ children }) => (
  <button type="button">{children}</button>
);

MenuItem.displayName = 'MenuItem';
