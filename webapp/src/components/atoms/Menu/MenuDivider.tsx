import styled, { css } from 'styled-components';

export interface MenuDividerProps {
  width?: `${number}%`;
}

export const MenuDivider = styled.hr<MenuDividerProps>`
  margin: 0 auto;
  box-shadow: none;

  ${({ theme, width = '100%' }) => css`
    width: ${width};
    color: ${theme.colors.gray300};
    border-color: ${theme.colors.gray300};
    background-color: ${theme.colors.gray300};
    border: 0.5px solid ${theme.colors.gray300};
    margin: ${theme.padding.mediumY};
  `}
`;
