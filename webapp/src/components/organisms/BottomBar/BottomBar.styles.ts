import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;

  ${({ theme }) => css`
    padding: ${theme.spacing.medium} ${theme.spacing.large} ${theme.spacing.large}
      ${theme.spacing.large};
    background-color: ${theme.colors.white};
    z-index: ${theme.zIndex.bottomBar};
    box-shadow: ${theme.shadows.box};
  `}
`;

export const List = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

export const ListItem = styled.li`
  list-style: none;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;

  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    outline-color: ${theme.colors.blue};

    &.active {
      color: ${theme.colors.blue};
    }
  `}
`;
