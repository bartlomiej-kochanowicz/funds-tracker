import { Icon } from 'components/atoms/Icon';
import { FC, forwardRef, Fragment, ReactNode } from 'react';
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

export const MenuItem: FC<MenuItemProps> = forwardRef<HTMLLIElement, MenuItemProps>(
  ({ children, onClick, to, isSelected = false, padding = 'medium', icon, ...rest }, ref) => (
    <li
      ref={ref}
      {...rest}
    >
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

              <Spreader spread="0.25" />
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

              <Spreader spread="0.25" />
            </Fragment>
          )}

          {children}
        </StyledLink>
      )}
    </li>
  ),
);

MenuItem.displayName = 'MenuItem';
