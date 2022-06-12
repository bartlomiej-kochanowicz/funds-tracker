import { FC, ReactNode, forwardRef } from 'react';
import styled, { css } from 'styled-components';

interface MenuProps {
  children: ReactNode;
}

const StyledUl = styled.ul`
  ${({ theme }) => css`
    border-radius: ${theme.radius.secondary};
    background-color: ${theme.colors.lightGray};
    padding: 0.5rem 1.25rem;
    outline-color: ${theme.colors.blue};
    color: ${theme.colors.black};
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
