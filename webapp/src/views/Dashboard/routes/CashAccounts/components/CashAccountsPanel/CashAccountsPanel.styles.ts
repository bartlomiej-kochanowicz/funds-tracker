import { darken } from 'color2k';
import { Box } from 'components/atoms';
import styled, { css } from 'styled-components';

const PanelComponent = styled(Box)`
  ${({ theme: { isDark, colors, shadows, radius } }) => css`
    background-color: ${isDark ? darken(colors.gray100, 0.03) : colors.white};
    box-shadow: ${shadows.box};
    border-radius: ${radius.secondary};
  `}
`;

const Body = styled.div`
  ${({ theme: { padding } }) => css`
    padding: ${padding.medium};
  `}
`;

const Footer = styled.div`
  ${({ theme: { padding, radius, colors } }) => css`
    background-color: ${colors.gray200};
    padding: ${padding.medium};
    border-radius: ${radius.secondary};
  `}
`;

interface IPanelComposition {
  Body: typeof Body;
  Footer: typeof Footer;
}

type PanelProps = typeof PanelComponent & IPanelComposition;

const Panel: PanelProps = PanelComponent as PanelProps;

Panel.Body = Body;
Panel.Footer = Footer;

export { Panel };
