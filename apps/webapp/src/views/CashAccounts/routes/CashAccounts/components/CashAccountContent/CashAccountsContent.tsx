import { MAX_CASH_ACCOUNTS } from "constants/common";
import { useSuspenseQueryCashAccounts } from "hooks/api/cashAccounts/useSuspenseQueryCashAccounts";
import { Fragment, useTransition } from "react";

import { CashAccountCard } from "../CashAccountCard";
import { CashAccountCreate } from "../CashAccountCreate";

export const CashAccountsContent = () => {
	const [isPending, startTransition] = useTransition();
	const { data, refetch } = useSuspenseQueryCashAccounts();

	const cashAccountsExist = Boolean(data.cashAccounts.length > 0);

	const renderCashAccountCreateButton = Boolean(data.cashAccounts.length < MAX_CASH_ACCOUNTS);

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

			{renderCashAccountCreateButton && (
				<CashAccountCreate
					isListEmpty={!cashAccountsExist}
					handleRefetch={handleRefetch}
				/>
			)}
		</Fragment>
	);
};
