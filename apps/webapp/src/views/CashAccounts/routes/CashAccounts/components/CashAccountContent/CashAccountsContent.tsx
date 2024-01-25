import { useSuspenseQuery } from "@apollo/client";
import { MAX_CASH_ACCOUNTS } from "constants/common";
import { GET_CASH_ACCOUNTS } from "graphql/query/cashAccounts/GetCashAccounts";
import { Fragment, useTransition } from "react";

import { CashAccountCard } from "../CashAccountCard";
import { CreateCashAccount } from "../CreateCashAccount";

export const CashAccountsContent = () => {
	const [isPending, startTransition] = useTransition();
	const { data, refetch } = useSuspenseQuery(GET_CASH_ACCOUNTS);

	const cashAccountsExist = Boolean(data.cashAccounts.length > 0);

	const renderCreateCashAccountButton = Boolean(data.cashAccounts.length < MAX_CASH_ACCOUNTS);

	const handleRefetch = () => {
		startTransition(() => {
			refetch();
		});
	};

	return (
		<Fragment>
			{data.cashAccounts.map(({ uuid, ...rest }) => (
				<CashAccountCard
					key={uuid}
					uuid={uuid}
					isPending={isPending}
					handleRefetch={handleRefetch}
					{...rest}
				/>
			))}

			{renderCreateCashAccountButton && (
				<CreateCashAccount
					isListEmpty={!cashAccountsExist}
					handleRefetch={handleRefetch}
				/>
			)}
		</Fragment>
	);
};
