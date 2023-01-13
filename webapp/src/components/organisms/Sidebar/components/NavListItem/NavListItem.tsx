import { Spreader, Text } from 'components/atoms';
import { FC, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { IconType } from 'react-icons';
import { useLocation } from 'react-router-dom';
import { ROUTES } from 'routes/paths';
import { Row } from 'simple-flexbox';
import { Colors } from 'styles/theme';
import { Bar } from './NavListItem.styles';

interface NavListItemProps {
  isActive: boolean;
  title: string;
  icon: IconType;
  to: string;
}

export const NavListItem: FC<NavListItemProps> = ({
  isActive: routerIsActive,
  title,
  icon: Icon,
  to,
}) => {
  const { t } = useTranslation();

  const location = useLocation();

  // Home route is active when pathname is exactly the same as the home route
  const isActive =
    to === ROUTES.DASHBOARD.HOME ? location.pathname === ROUTES.DASHBOARD.HOME : routerIsActive;

  return (
    <Fragment>
      <Row>
        <Icon
          size="1.25rem"
          color={isActive ? Colors.Blue : undefined}
        />

        <Spreader spread="small" />

        <Text
          fontColor={isActive ? 'text' : 'gray400'}
          fontWeight={isActive ? '700' : '500'}
        >
          {t(title)}
        </Text>
      </Row>

      {isActive && <Bar />}
    </Fragment>
  );
};
