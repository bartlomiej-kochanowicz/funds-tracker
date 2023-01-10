import { ReactNode, forwardRef } from 'react';
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
    background-color: ${theme.colors.gray200};
    padding: ${theme.padding.mediumY};
    outline-color: ${theme.colors.blue};
    color: ${theme.colors.black};
    box-shadow: ${theme.shadows.box};
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
