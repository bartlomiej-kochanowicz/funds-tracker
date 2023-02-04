import { darken } from 'color2k';
import { Box } from 'components/atoms';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const PanelWrapper = styled(Box)`
  ${({ theme: { isDark, colors, shadows, radius } }) => css`
    background-color: ${isDark ? darken(colors.gray100, 0.03) : colors.white};
    box-shadow: ${shadows.box};
    border-radius: ${radius.secondary};
  `}
`;

export const PanelLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;

  svg {
    cursor: pointer;
  }
`;

export const Body = styled.div`
  ${({ theme: { padding } }) => css`
    padding: ${padding.large};
  `}
`;

export const BodyCentered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  ${({ theme: { padding } }) => css`
    padding: ${padding.large};
  `}
`;

export const Chart = styled.div`
  padding: 0.5rem 0.75rem;
`;

export const Footer = styled.div`
  ${({ theme: { radius, colors, spacing } }) => css`
    background-color: ${colors.gray200};
    padding: ${spacing.small} ${spacing.large};
    border-radius: 0 0 ${radius.secondary} ${radius.secondary};
  `}
`;
