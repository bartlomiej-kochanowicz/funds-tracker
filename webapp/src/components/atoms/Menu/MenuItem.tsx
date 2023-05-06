import { Icon } from 'components/atoms/Icon';
import { FC, ForwardedRef, forwardRef, Fragment, ReactNode } from 'react';
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
  highlighted?: boolean;
}

export const MenuItem: FC<MenuItemProps> = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  MenuItemProps
>(({ children, onClick, to, isSelected = false, padding = 'medium', icon, ...rest }, ref) => (
  <Fragment>
    {!to && onClick && (
      <StyledButton
        type="button"
        onClick={onClick}
        isSelected={isSelected}
        padding={padding}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        {...rest}
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
        ref={ref as ForwardedRef<HTMLAnchorElement>}
        {...rest}
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
  </Fragment>
));

MenuItem.displayName = 'MenuItem';
