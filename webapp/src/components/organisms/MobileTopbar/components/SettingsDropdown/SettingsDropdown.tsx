import { FC } from 'react';
import { FaCog } from 'react-icons/fa';
import { Dropdown, Icon } from 'components/atoms';
import { DropdownContent } from '../DropdownContent';

export const SettingsDropdown: FC = () => (
  <Dropdown
    content={DropdownContent}
    placement="bottom-end"
  >
    <Icon
      icon={FaCog}
      size="1.5"
      color="gray400"
    />
  </Dropdown>
);
