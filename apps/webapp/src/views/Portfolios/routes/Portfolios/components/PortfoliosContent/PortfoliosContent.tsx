import { useSuspenseQuery } from "@apollo/client";
import { MAX_PORTFOLIOS } from "constants/common";
import { GET_PORTFOLIOS } from "graphql/query/portfolios/GetPortfolios";
import { Fragment, useTransition } from "react";

import { CreatePortfolio } from "../CreatePortfolio";
import { PortfolioCard } from "../PortfolioCard";

export const PortfoliosContent = () => {
	const [isPending, startTransition] = useTransition();
	const { data, refetch } = useSuspenseQuery(GET_PORTFOLIOS);

	const portfoliosExist = Boolean(data.portfolios.length > 0);

	const renderCreatePortfolioButton = Boolean(data.portfolios.length < MAX_PORTFOLIOS);

	const handleRefetch = () => {
		startTransition(() => {
			refetch();
		});
	};

	return (
		<Fragment>
			{data.portfolios.map(({ uuid, ...rest }) => (
				<PortfolioCard
					key={uuid}
					uuid={uuid}
					isPending={isPending}
					handleRefetch={handleRefetch}
					{...rest}
				/>
			))}

			{renderCreatePortfolioButton && (
				<CreatePortfolio
					isListEmpty={!portfoliosExist}
					handleRefetch={handleRefetch}
				/>
			)}
		</Fragment>
	);
};
