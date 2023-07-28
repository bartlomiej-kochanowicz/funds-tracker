import { Icon } from 'components/atoms/Icon';
import { FC, ForwardedRef, forwardRef, Fragment, ReactNode } from 'react';
import { IconType } from 'react-icons';
import { DefaultTheme } from 'styled-components';

import { Spreader } from '../Spreader';
import { StyledButton, StyledLink } from './MenuItem.styles';

export type ItemChildrenProps = {
  ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>;
};

export interface MenuItemProps {
  children: ReactNode | ((props: ItemChildrenProps) => ReactNode);
  onClick?: () => void;
  to?: string;
  $isSelected?: boolean;
  $padding?: keyof DefaultTheme['padding'];
  icon?: IconType;
  $maxWidth?: `${string}px` | `${string}%`;
}

export const MenuItem: FC<MenuItemProps> = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  MenuItemProps
>(({ children, onClick, to, $isSelected = false, $padding = 'medium', icon, ...rest }, ref) => (
  <Fragment>
    {!to && onClick && (
      <StyledButton
        type="button"
        onClick={onClick}
        $isSelected={$isSelected}
        $padding={$padding}
        ref={ref as ForwardedRef<HTMLButtonElement>}
        {...rest}
      >
        {icon && (
          <Fragment>
            <Icon icon={icon} />

            <Spreader $spread="0.25" />
          </Fragment>
        )}

        {typeof children !== 'function' && children}
      </StyledButton>
    )}

    {to && !onClick && (
      <StyledLink
        to={to}
        $padding={$padding}
        ref={ref as ForwardedRef<HTMLAnchorElement>}
        {...rest}
      >
        {icon && (
          <Fragment>
            <Icon icon={icon} />

            <Spreader $spread="0.25" />
          </Fragment>
        )}

        {typeof children !== 'function' && children}
      </StyledLink>
    )}

    {!to && !onClick && typeof children !== 'function' && children}

    {!to && !onClick && typeof children === 'function' && children({ ref, ...rest })}
  </Fragment>
));

MenuItem.displayName = 'MenuItem';
