import styled, { css } from 'styled-components';

export interface MenuDividerProps {
  width: `${number}%`;
}

export const MenuDivider = styled.hr<MenuDividerProps>`
  margin: 0 auto;
  box-shadow: none;

  ${({ theme, width = '80%' }) => css`
    width: ${width};
    color: ${theme.colors.lightGray};
    border-color: ${theme.colors.lightGray};
    background-color: ${theme.colors.lightGray};
    border: 1px solid ${theme.colors.lightGray};
  `}
`;
