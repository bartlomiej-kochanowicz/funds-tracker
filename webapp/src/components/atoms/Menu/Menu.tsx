import { ReactNode, forwardRef } from 'react';
import { darken } from 'color2k';
import styled, { css } from 'styled-components';

export interface MenuProps {
  children: ReactNode;
  minMenuWidth?: `${number}${'px' | 'rem'}`;
}

const StyledUl = styled.ul<MenuProps>`
  max-height: 14rem;
  overflow-y: auto;

  ${({ theme, minMenuWidth }) => css`
    border-radius: ${theme.radius.secondary};
    background-color: ${theme.colors.gray100};
    padding: ${theme.padding.mediumY};
    outline-color: ${theme.colors.blue};
    color: ${theme.colors.black};
    border: 1px solid ${darken(theme.colors.gray100, 0.05)};
    box-shadow: ${theme.shadows.dropdown};
    display: flex;
    flex-direction: column;

    ${minMenuWidth &&
    css`
      min-width: ${minMenuWidth};
    `}

    li {
      list-style: none;
    }
  `}
`;

export const Menu = forwardRef<HTMLUListElement, MenuProps>(({ children, ...rest }, ref) => (
  <StyledUl
    role="menu"
    ref={ref}
    {...rest}
  >
    {children}
  </StyledUl>
));

Menu.displayName = 'Menu';

Menu.defaultProps = {
  minMenuWidth: undefined,
};
