import { PanelComponent } from './Panel';
import { Body, BodyCentered, Chart, Footer } from './Panel.styles';

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
