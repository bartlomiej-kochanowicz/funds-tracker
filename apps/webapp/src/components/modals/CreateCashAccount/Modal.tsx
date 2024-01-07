/* import { FC, lazy, Suspense } from "react";

import type { CreateCashAccountProps } from "./CreateCashAccount";

const CreateCashAccount = lazy(() =>
	import("./CreateCashAccount").then(({ CreateCashAccount: component }) => ({
		default: component,
	})),
);

export const MODAL_CREATE_CASH_ACCOUNT = "CreateCashAccount";

export const Modal: FC<CreateCashAccountProps> = props => (
	<Suspense>
		<CreateCashAccount
			id={MODAL_CREATE_CASH_ACCOUNT}
			{...props}
		/>
	</Suspense>
);
 */
