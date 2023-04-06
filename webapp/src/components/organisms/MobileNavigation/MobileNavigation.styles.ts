import { Text } from 'components/atoms';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const StyledNav = styled.nav`
  position: fixed;
  width: 270px;
  left: calc(50% - 135px);
  right: calc(50% - 135px);

  ${({ theme: { colors, padding, zIndex, spacing, radius } }) => css`
    padding: ${padding.medium};
    background: ${colors.mobileTransparent};
    border-radius: 16px;
    backdrop-filter: blur(10px);
    z-index: ${zIndex.mobileNavigation};
    bottom: ${spacing['1.5']};
    border-radius: ${radius['6.25']};
  `}
`;

export const List = styled.ul`
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const ListItem = styled.li`
  list-style: none;
`;

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;

  ${({ theme }) => css`
    color: ${theme.colors.gray400};

    &:focus-visible {
      outline: 2px solid ${theme.colors.blue};
    }

    &.active {
      color: ${theme.colors.blue};
    }
  `}
`;

export const Title = styled(Text)`
  width: 75px;
  overflow: hidden;
  display: inline-block;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
