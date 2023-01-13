import { PanelComponent, Body, BodyCentered, Footer, Chart } from './Panel.styles';

interface IPanelComposition {
  Body: typeof Body;
  BodyCentered: typeof BodyCentered;
  Footer: typeof Footer;
  Chart: typeof Chart;
}

type PanelProps = typeof PanelComponent & IPanelComposition;

const Panel: PanelProps = PanelComponent as PanelProps;

Panel.Body = Body;
Panel.BodyCentered = BodyCentered;
Panel.Footer = Footer;
Panel.Chart = Chart;

export { Panel };
