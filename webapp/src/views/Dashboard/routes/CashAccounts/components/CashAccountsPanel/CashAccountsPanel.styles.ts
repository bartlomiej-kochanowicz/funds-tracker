import { darken } from 'color2k';
import { Box } from 'components/atoms';
import styled, { css } from 'styled-components';

export const Wrapper = styled(Box)`
  ${({ theme: { isDark, colors, shadows, padding, radius } }) => css`
    background-color: ${isDark ? darken(colors.gray100, 0.03) : colors.white};
    box-shadow: ${shadows.box};
    padding: ${padding.medium};
    border-radius: ${radius.secondary};
  `}
`;
