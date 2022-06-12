import { ReactNode, forwardRef } from 'react';
import { darken } from 'color2k';
import styled, { css } from 'styled-components';

interface MenuProps {
  children: ReactNode;
  minMenuWidth?: number | null;
}

const StyledUl = styled.ul<MenuProps>`
  ${({ theme, minMenuWidth }) => css`
    border-radius: ${theme.radius.secondary};
    background-color: ${theme.colors.lightGray};
    padding: 0.5rem 1.25rem;
    outline-color: ${theme.colors.blue};
    color: ${theme.colors.black};
    border: 1px solid ${darken(theme.colors.lightGray, 0.05)};
    box-shadow: ${theme.shadows.dropdown};

    ${minMenuWidth &&
    css`
      min-width: ${minMenuWidth}px;
    `}
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
  minMenuWidth: null,
};
