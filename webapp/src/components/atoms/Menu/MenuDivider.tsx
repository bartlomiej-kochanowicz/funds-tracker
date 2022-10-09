import styled, { css } from 'styled-components';

export interface MenuDividerProps {
  width: `${number}%`;
}

export const MenuDivider = styled.hr<MenuDividerProps>`
  margin: 0 auto;
  box-shadow: none;

  ${({ /* theme, */ width = '80%' }) => css`
    width: ${width};
    color: #e3e3e3;
    border-color: #e3e3e3;
    background-color: #e3e3e3;
    border: 1px solid #e3e3e3;
  `}
`;
