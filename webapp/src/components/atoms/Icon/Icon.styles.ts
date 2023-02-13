import styled, { css, DefaultTheme } from 'styled-components';

interface IconProps {
  size: keyof DefaultTheme['font']['size'];
  color?: keyof DefaultTheme['colors'];
}

export const StyledIcon = styled.span.withConfig({
  shouldForwardProp: prop => !['size', 'color'].includes(prop),
})<IconProps>`
  ${({ theme, size, color }) => css`
    width: ${theme.font.size[size]};
    height: ${theme.font.size[size]};

    ${color && `color: ${theme.colors[color]};`}
  `}
`;
