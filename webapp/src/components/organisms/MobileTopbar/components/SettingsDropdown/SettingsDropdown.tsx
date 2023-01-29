import { FC } from 'react';
import { FaCog } from 'react-icons/fa';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { Colors } from 'styles/theme';
import { Dropdown } from 'components/atoms';
import { DropdownContent } from '../DropdownContent';

export const SettingsDropdown: FC = () => {
  const { isDark } = useColorThemeContext();

  return (
    <Dropdown
      content={DropdownContent}
      placement="bottom-end"
    >
      <FaCog
        size="1.5rem"
        color={isDark ? Colors.Gray200 : Colors.Gray400}
      />
    </Dropdown>
  );
};
