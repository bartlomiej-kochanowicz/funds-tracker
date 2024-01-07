/* import { FC, lazy, Suspense } from "react";

import type { InvestFundsProps } from "./InvestFunds";

const InvestFunds = lazy(() =>
	import("./InvestFunds").then(({ InvestFunds: component }) => ({
		default: component,
	})),
);

export const MODAL_INVEST_FUNDS = "InvestFunds";

export const Modal: FC<InvestFundsProps> = props => (
	<Suspense>
		<InvestFunds
			id={MODAL_INVEST_FUNDS}
			{...props}
		/>
	</Suspense>
);
 */
