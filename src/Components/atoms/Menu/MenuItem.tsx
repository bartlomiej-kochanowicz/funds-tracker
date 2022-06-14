import { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface MenuItemProps {
  children: ReactNode;
  onClick: () => void;
}

const StyledButton = styled.button`
  border: none;
  width: 100%;
  background-color: transparent;
  cursor: pointer;

  ${({ theme }) => css`
    color: ${theme.colors.black};
    padding: ${theme.padding.small.map(p => p).join(' ')};
    outline-color: ${theme.colors.blue};

    &:hover {
      background-color: ${theme.colors.blue};
      color: ${theme.colors.white};
    }
  `};
`;

export const MenuItem: FC<MenuItemProps> = ({ children, onClick }) => (
  <li>
    <StyledButton
      type="button"
      onClick={onClick}
    >
      {children}
    </StyledButton>
  </li>
);

MenuItem.displayName = 'MenuItem';
