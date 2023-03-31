import { Icon } from 'components/atoms/Icon';
import { FC, Fragment, ReactNode } from 'react';
import { IconType } from 'react-icons';
import { DefaultTheme } from 'styled-components';

import { Spreader } from '../Spreader';
import { StyledButton, StyledLink } from './MenuItem.styles';

export interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  to?: string;
  isSelected?: boolean;
  padding?: keyof DefaultTheme['padding'];
  icon?: IconType;
}

export const MenuItem: FC<MenuItemProps> = ({
  children,
  onClick,
  to,
  isSelected = false,
  padding = 'medium',
  icon,
}) => (
  <li>
    {!to && onClick && (
      <StyledButton
        type="button"
        onClick={onClick}
        isSelected={isSelected}
        padding={padding}
      >
        {icon && (
          <Fragment>
            <Icon icon={icon} />

            <Spreader spread="tiny" />
          </Fragment>
        )}

        {children}
      </StyledButton>
    )}

    {to && !onClick && (
      <StyledLink
        to={to}
        padding={padding}
      >
        {icon && (
          <Fragment>
            <Icon icon={icon} />

            <Spreader spread="tiny" />
          </Fragment>
        )}

        {children}
      </StyledLink>
    )}
  </li>
);

MenuItem.displayName = 'MenuItem';
