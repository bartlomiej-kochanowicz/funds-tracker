import { Icon, Spreader, Text } from 'components/atoms';
import { useColorThemeContext } from 'contexts/ColorThemeContext';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';

interface NavListItemProps {
  isActive: boolean;
  title: string;
  icon: IconType;
}

export const NavListItem: FC<NavListItemProps> = ({ isActive, title, icon: IconComponent }) => {
  const { t } = useTranslation();

  const { isDark } = useColorThemeContext();

  const activeColor = isDark ? 'white' : 'black';

  const fontColor = isActive ? activeColor : 'gray400';

  return (
    <Fragment>
      <Icon
        icon={IconComponent}
        size="1.25"
        color={isActive ? 'blue' : undefined}
      />

      <Spreader spread="small" />

      <Text
        fontColor={fontColor}
        fontWeight={isActive ? '700' : '500'}
      >
        {t(title)}
      </Text>
    </Fragment>
  );
};
