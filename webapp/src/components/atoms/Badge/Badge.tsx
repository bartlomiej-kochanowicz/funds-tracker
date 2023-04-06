import { lighten } from 'color2k';
import styled, { css, DefaultTheme } from 'styled-components';

export type BadgeColors = keyof DefaultTheme['button']['color'];

interface BadgeProps {
  color?: BadgeColors;
}

export const Badge = styled.span<BadgeProps>`
  ${({ theme, color = 'primary' }) => css`
    background-color: ${lighten(theme.button.color[color].background, 0.3)};
    color: ${theme.button.color[color].background};
    padding: ${theme.padding.tiny};
    border-radius: ${theme.radius['0.375']};
    padding: ${theme.padding.tiny};
    font-size: ${theme.font.size[0.75]};
    font-weight: ${theme.font.weight[700]};
    width: min-content;
    white-space: nowrap;
  `}
`;
