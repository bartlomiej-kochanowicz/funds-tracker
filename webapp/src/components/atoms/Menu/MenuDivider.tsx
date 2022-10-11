import styled, { css } from 'styled-components';

export interface MenuDividerProps {
  width: `${number}%`;
}

export const MenuDivider = styled.hr<MenuDividerProps>`
  margin: 0 auto;
  box-shadow: none;

  ${({ theme, width = '80%' }) => css`
    width: ${width};
    color: ${theme.colors.gray200};
    border-color: ${theme.colors.gray200};
    background-color: ${theme.colors.gray200};
    border: 1px solid ${theme.colors.gray200};
  `}
`;
