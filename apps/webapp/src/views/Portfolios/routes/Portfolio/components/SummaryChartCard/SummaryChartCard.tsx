import { Card } from "@funds-tracker/ui";

import { SummaryChartContextProvider } from "../../context";
import { SummaryChart } from "../SummaryChart/SummaryChart";
import { SummaryChartOptions } from "../SummaryChartOptions";

type SummaryChartCardProps = {
	uuid: string;
};

export const SummaryChartCard = ({ uuid }: SummaryChartCardProps) => (
	<Card>
		<Card.Content>
			<SummaryChartContextProvider>
				<SummaryChart uuid={uuid} />
				<SummaryChartOptions />
			</SummaryChartContextProvider>
		</Card.Content>
	</Card>
);
