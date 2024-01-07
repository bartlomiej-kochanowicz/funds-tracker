/* import { FC, lazy, Suspense } from "react";

import type { ConfirmDeleteCashAccountProps } from "./ConfirmDeleteCashAccount";

const ConfirmDeleteCashAccount = lazy(() =>
	import("./ConfirmDeleteCashAccount").then(({ ConfirmDeleteCashAccount: component }) => ({
		default: component,
	})),
);

export const MODAL_CONFIRM_DELETE_CASH_ACCOUNT = "ConfirmDeleteCashAccount";

export const Modal: FC<ConfirmDeleteCashAccountProps> = props => (
	<Suspense>
		<ConfirmDeleteCashAccount
			id={MODAL_CONFIRM_DELETE_CASH_ACCOUNT}
			{...props}
		/>
	</Suspense>
);
 */
