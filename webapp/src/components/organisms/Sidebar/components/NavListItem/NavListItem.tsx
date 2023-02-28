import { Icon, Spreader, Text } from 'components/atoms';
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

  return (
    <Fragment>
      <Icon
        icon={IconComponent}
        size="1.25"
        color={isActive ? 'blue' : undefined}
      />

      <Spreader spread="small" />

      <Text
        fontColor={isActive ? 'blue' : 'gray400'}
        fontWeight={isActive ? '700' : '500'}
      >
        {t(title)}
      </Text>
    </Fragment>
  );
};
