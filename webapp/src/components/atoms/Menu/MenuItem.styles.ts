import { transparentize } from 'color2k';
import { Link } from 'react-router-dom';
import styled, { css, DefaultTheme } from 'styled-components';

const mixin = css<{
  padding: keyof DefaultTheme['padding'];
  maxWidth?: `${string}px` | `${string}%`;
}>`
  display: flex;
  align-items: center;
  border: none;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  text-align: left;
  outline: none;

  ${({ theme, padding, maxWidth }) => css`
    color: ${theme.colors.text};
    padding: ${theme.padding[padding]};

    &:focus-visible,
    &:focus {
      background-color: ${transparentize(theme.colors.gray300, 0.75)};
    }

    ${maxWidth &&
    css`
      max-width: ${maxWidth};
    `}
  `};
`;

export const StyledButton = styled.button<{
  isSelected: boolean;
  padding: keyof DefaultTheme['padding'];
  maxWidth?: `${string}px` | `${string}%`;
}>`
  ${mixin}

  ${({ theme, isSelected }) => css`
    ${isSelected &&
    css`
      font-weight: ${theme.font.weight[700]};
    `}
  `}
`;

export const StyledLink = styled(Link)<{
  padding: keyof DefaultTheme['padding'];
  maxWidth?: `${string}px` | `${string}%`;
}>`
  ${mixin}

  text-decoration: none;
`;
