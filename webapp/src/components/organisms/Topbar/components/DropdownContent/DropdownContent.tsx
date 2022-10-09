import { Menu } from 'components/atoms';
import { forwardRef } from 'react';

export const DropdownContent = forwardRef<HTMLButtonElement, {}>(({ ...rest }, ref) => (
  <Menu
    minMenuWidth="270px"
    ref={ref}
    {...rest}
  >
    <Menu.Item padding="medium">My profile</Menu.Item>

    <Menu.Divider width="85%" />

    <Menu.Item padding="medium">Sign out</Menu.Item>
  </Menu>
));
