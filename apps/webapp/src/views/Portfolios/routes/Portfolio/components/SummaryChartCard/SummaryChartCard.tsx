import { Card } from "@funds-tracker/ui";
import { Suspense } from "react";

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
				<SummaryChartOptions />
				<Suspense fallback="Loading...">
					<SummaryChart uuid={uuid} />
				</Suspense>
			</SummaryChartContextProvider>
		</Card.Content>
	</Card>
);
