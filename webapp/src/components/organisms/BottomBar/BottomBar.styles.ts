import { /* darken, */ transparentize } from 'color2k';
import { Text } from 'components/atoms';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const StyledNav = styled.nav`
  position: fixed;
  width: 270px;
  left: calc(50% - 135px);
  right: calc(50% - 135px);

  ${({ theme: { isDark, colors, padding, zIndex, spacing, radius } }) => css`
    padding: ${padding.medium};
    background: ${transparentize(colors.gray200, isDark ? 0.3 : 0.4)};
    border-radius: 16px;
    backdrop-filter: blur(10px);
    z-index: ${zIndex.bottomBar};
    bottom: ${spacing.large};
    border-radius: ${radius.primary};
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
    outline-color: ${theme.colors.blue};

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
