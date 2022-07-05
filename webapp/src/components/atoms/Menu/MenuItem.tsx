import { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';

export interface MenuItemProps {
  children: ReactNode;
  onClick: () => void;
  isSelected: boolean;
}

const StyledButton = styled.button<{ isSelected: boolean }>`
  border: none;
  width: 100%;
  background-color: transparent;
  cursor: pointer;

  ${({ theme, isSelected }) => css`
    color: ${theme.colors.black};
    padding: ${theme.padding.small};
    outline-color: ${theme.colors.blue};

    ${isSelected &&
    css`
      font-weight: ${theme.font.weight[700]};
    `}

    &:hover {
      background-color: ${theme.colors.blue};
      color: ${theme.colors.white};
    }
  `};
`;

export const MenuItem: FC<MenuItemProps> = ({ children, onClick, isSelected }) => (
  <li>
    <StyledButton
      type="button"
      onClick={onClick}
      isSelected={isSelected}
    >
      {children}
    </StyledButton>
  </li>
);

MenuItem.displayName = 'MenuItem';
