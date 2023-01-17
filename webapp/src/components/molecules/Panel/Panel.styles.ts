import { darken } from 'color2k';
import { Box } from 'components/atoms';
import styled, { css } from 'styled-components';

export const PanelComponent = styled(Box)`
  height: 206px;

  ${({ theme: { isDark, colors, shadows, radius } }) => css`
    background-color: ${isDark ? darken(colors.gray100, 0.03) : colors.white};
    box-shadow: ${shadows.box};
    border-radius: ${radius.secondary};
  `}
`;

export const Body = styled.div`
  ${({ theme: { padding } }) => css`
    padding: ${padding.medium};
  `}
`;

export const BodyCentered = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  ${({ theme: { padding } }) => css`
    padding: ${padding.medium};
  `}
`;

export const Chart = styled.div`
  padding: 0.5rem 0.75rem;
`;

export const Footer = styled.div`
  ${({ theme: { padding, radius, colors } }) => css`
    background-color: ${colors.gray200};
    padding: ${padding.medium};
    border-radius: 0 0 ${radius.secondary} ${radius.secondary};
  `}
`;