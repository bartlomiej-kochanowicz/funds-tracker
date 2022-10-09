import { Menu } from 'components/atoms';
import { forwardRef } from 'react';

export const DropdownContent = forwardRef<HTMLButtonElement, {}>(({ ...rest }, ref) => (
  <Menu
    minMenuWidth="270px"
    ref={ref}
    {...rest}
  >
    <Menu.Item>test</Menu.Item>

    <Menu.Divider />

    <Menu.Item>3</Menu.Item>
  </Menu>
));
