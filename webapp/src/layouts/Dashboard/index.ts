import { Center } from './Dashboard.styles';
import { Dashboard as DashboardComponent } from './Dashboard';

interface IDashboardComposition {
  Center: typeof Center;
}

type DashboardProps = typeof DashboardComponent & IDashboardComposition;

const Dashboard: DashboardProps = DashboardComponent as DashboardProps;

Dashboard.Center = Center;

export { Dashboard };
