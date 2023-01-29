import { Menu, Text, ThemeSwitcher } from 'components/atoms';
import { forwardRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ApperienceWrapper } from './DropdownContent.styles';

interface DropdownContentProps {
  handleToggle: () => void;
}

export const DropdownContent = forwardRef<HTMLUListElement, DropdownContentProps>(
  ({ handleToggle, ...rest }, ref) => {
    const { t } = useTranslation();

    return (
      <Menu
        ref={ref}
        minMenuWidth="270px"
        {...rest}
      >
        <Menu.Item>test</Menu.Item>

        <Menu.Item>aaa</Menu.Item>

        <Menu.Divider />

        <ApperienceWrapper>
          <Text>{t('common.apperience')}</Text>

          <ThemeSwitcher />
        </ApperienceWrapper>
      </Menu>
    );
  },
);
