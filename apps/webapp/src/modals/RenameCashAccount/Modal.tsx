import { FC, lazy, Suspense } from "react";

import type { RenameCashAccountProps } from "./RenameCashAccount";

const RenameCashAccount = lazy(() =>
	import("./RenameCashAccount").then(({ RenameCashAccount: component }) => ({
		default: component,
	})),
);

export const MODAL_RENAME_CASH_ACCOUNT = "RenameCashAccount";

export const Modal: FC<RenameCashAccountProps> = props => (
	<Suspense>
		<RenameCashAccount id={MODAL_RENAME_CASH_ACCOUNT} {...props} />
	</Suspense>
);
