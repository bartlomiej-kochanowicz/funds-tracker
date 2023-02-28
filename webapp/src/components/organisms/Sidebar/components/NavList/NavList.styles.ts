import { transparentize } from 'color2k';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const List = styled.ul`
  padding: 0;
`;

export const ListItem = styled.li`
  list-style: none;

  .active {
    background-color: ${({ theme }) => transparentize(theme.colors.blue, 0.9)};
  }
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  width: 214px;
  transition: 0.3s;

  ${({ theme }) => css`
    color: ${theme.colors.gray400};
    outline-color: ${theme.colors.blue};
    padding: ${theme.padding.large};
    border-radius: ${theme.radius.primary};

    &:hover:not(.active) {
      background-color: ${theme.colors.gray200};
    }
  `}
`;
