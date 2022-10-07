import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const List = styled.ul`
  padding: 0;
`;

export const ListItem = styled.li`
  list-style: none;
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  width: 214px;
  padding-right: 0;

  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
    padding: ${theme.padding.small};
    outline-color: ${theme.colors.blue};

    &.active {
      color: ${theme.colors.blue};
    }
  `}
`;

export const Bar = styled.span`
  border-bottom-left-radius: 9999px;
  border-top-left-radius: 9999px;

  ${({ theme }) => css`
    width: ${theme.spacing.tiny};
    height: calc(${theme.spacing.medium} + ${theme.spacing.tiny});
    background-color: ${theme.colors.blue};
  `}
`;
