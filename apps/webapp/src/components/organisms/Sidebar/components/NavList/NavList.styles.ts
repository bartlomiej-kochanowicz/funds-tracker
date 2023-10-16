import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const List = styled.ul`
  padding: 0;
`;

export const ListItem = styled.li`
  list-style: none;

  .active {
    background-color: ${({ theme }) => theme.colors.gray200};
  }
`;

export const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  width: 214px;

  ${({ theme }) => css`
    transition: ${theme.transition.primary};
    color: ${theme.colors.gray400};
    padding: ${theme.padding.large};
    border-radius: ${theme.radius['0.7']};

    &:focus-visible {
      outline: 2px solid ${theme.colors.blue};
    }

    &:hover:not(.active) {
      background-color: ${theme.colors.gray200};
    }
  `}
`;
