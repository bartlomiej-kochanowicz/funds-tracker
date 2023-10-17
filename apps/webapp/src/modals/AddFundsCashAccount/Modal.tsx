import { FC, lazy, Suspense } from "react";

import type { AddFundsCashAccountProps } from "./AddFundsCashAccount";

const AddFundsCashAccount = lazy(() =>
	import("./AddFundsCashAccount").then(({ AddFundsCashAccount: component }) => ({
		default: component,
	})),
);

export const MODAL_ADD_FUNDS_CASH_ACCOUNT = "AddFundsCashAccount";

export const Modal: FC<AddFundsCashAccountProps> = props => (
	<Suspense>
		<AddFundsCashAccount id={MODAL_ADD_FUNDS_CASH_ACCOUNT} {...props} />
	</Suspense>
);
