import { H1 } from "@funds-tracker/ui";
import { useSuspenseQueryPortfolio } from "hooks/api/portfolios/useSuspenseQueryPortfolio";
import { Suspense } from "react";
import { useParams } from "react-router-dom";

import { SummaryChart } from "./components/SummaryChart";
import { TransactionsTable } from "./components/TransactionsTable";

export const Portfolio = () => {
	const { uuid } = useParams<{ uuid: string }>();

	if (!uuid) {
		return null;
	}

	const { data } = useSuspenseQueryPortfolio(uuid);

	return (
		<Suspense>
			<H1 className="mb-4">{data.portfolio.name}</H1>
			<div className="flex flex-col gap-4">
				<SummaryChart uuid={uuid} />
				<TransactionsTable uuid={uuid} />
			</div>
		</Suspense>
	);
};
