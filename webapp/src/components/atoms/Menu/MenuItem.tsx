import { FC, ReactNode } from 'react';
import styled, { css, DefaultTheme } from 'styled-components';

export interface MenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  isSelected?: boolean;
  padding?: keyof DefaultTheme['padding'];
}

const StyledButton = styled.button<{ isSelected: boolean; padding: keyof DefaultTheme['padding'] }>`
  border: none;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  text-align: left;

  ${({ theme, isSelected, padding }) => css`
    color: ${theme.colors.black};
    padding: ${theme.padding[padding]};
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

export const MenuItem: FC<MenuItemProps> = ({
  children,
  onClick,
  isSelected = false,
  padding = 'small',
}) => (
  <li>
    <StyledButton
      type="button"
      onClick={onClick}
      isSelected={isSelected}
      padding={padding}
    >
      {children}
    </StyledButton>
  </li>
);

MenuItem.displayName = 'MenuItem';

MenuItem.defaultProps = {
  onClick: () => null,
  isSelected: false,
  padding: 'small',
};
