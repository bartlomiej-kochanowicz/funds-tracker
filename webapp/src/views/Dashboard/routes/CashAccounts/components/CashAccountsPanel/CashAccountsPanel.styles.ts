import { darken } from 'color2k';
import { Box } from 'components/atoms';
import styled, { css } from 'styled-components';

export const Wrapper = styled(Box)`
  ${({ theme: { isDark, colors, shadows, radius } }) => css`
    background-color: ${isDark ? darken(colors.gray100, 0.03) : colors.white};
    box-shadow: ${shadows.box};
    border-radius: ${radius.secondary};
  `}
`;

export const Footer = styled.div`
  ${({ theme: { padding, radius, colors } }) => css`
    background-color: ${colors.gray200};
    padding: ${padding.medium};
    border-radius: ${radius.secondary};
  `}
`;
