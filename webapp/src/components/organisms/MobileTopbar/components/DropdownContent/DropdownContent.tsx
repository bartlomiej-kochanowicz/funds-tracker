import { Menu, Text, ThemeSwitcher } from 'components/atoms';
import { forwardRef } from 'react';
import { ApperienceWrapper } from './DropdownContent.styles';

interface DropdownContentProps {
  handleToggle: () => void;
}

export const DropdownContent = forwardRef<HTMLUListElement, DropdownContentProps>(
  ({ handleToggle, ...rest }, ref) => (
    <Menu
      ref={ref}
      minMenuWidth="270px"
      {...rest}
    >
      <Menu.Item>test</Menu.Item>

      <Menu.Item>aaa</Menu.Item>

      <Menu.Divider />

      <ApperienceWrapper>
        <Text>Apperience</Text>

        <ThemeSwitcher />
      </ApperienceWrapper>
    </Menu>
  ),
);
