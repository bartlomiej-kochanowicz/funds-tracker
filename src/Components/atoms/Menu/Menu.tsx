import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface MenuProps {
  children: ReactNode;
}

const StyledUl = styled.ul``;

export const Menu: FC<MenuProps> = ({ children }) => <StyledUl role="menu">{children}</StyledUl>;
