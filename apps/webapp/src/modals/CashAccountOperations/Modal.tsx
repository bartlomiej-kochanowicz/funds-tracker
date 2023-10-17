import { FC, lazy, Suspense } from "react";

import type { CashAccountOperationsProps } from "./CashAccountOperations";

const CashAccountOperations = lazy(() =>
	import("./CashAccountOperations").then(({ CashAccountOperations: component }) => ({
		default: component,
	})),
);

export const MODAL_CASH_ACCOUNT_OPERATIONS = "ManageCashAccount";

export const Modal: FC<CashAccountOperationsProps> = props => (
	<Suspense>
		<CashAccountOperations id={MODAL_CASH_ACCOUNT_OPERATIONS} {...props} />
	</Suspense>
);
