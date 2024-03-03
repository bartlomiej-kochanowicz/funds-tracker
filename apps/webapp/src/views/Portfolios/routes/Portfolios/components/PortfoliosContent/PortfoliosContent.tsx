import { MAX_PORTFOLIOS } from "constants/common";
import { useSuspenseQueryPortfolios } from "hooks/api/portfolios/useSuspenseQueryPortfolios";
import { Fragment, useTransition } from "react";

import { PortfolioCard } from "../PortfolioCard";
import { PortfolioCreate } from "../PortfolioCreate";

export const PortfoliosContent = () => {
	const [isPending, startTransition] = useTransition();
	const { data, refetch } = useSuspenseQueryPortfolios();

	const portfoliosExist = Boolean(data.portfolios.length > 0);

	const renderPortfolioCreateButton = Boolean(data.portfolios.length < MAX_PORTFOLIOS);

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

			{renderPortfolioCreateButton && (
				<PortfolioCreate
					isListEmpty={!portfoliosExist}
					handleRefetch={handleRefetch}
				/>
			)}
		</Fragment>
	);
};
