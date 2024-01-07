/* import { FC, lazy, Suspense } from "react";

import type { RenamePortfolioProps } from "./RenamePortfolio";

const RenamePortfolio = lazy(() =>
	import("./RenamePortfolio").then(({ RenamePortfolio: component }) => ({
		default: component,
	})),
);

export const MODAL_RENAME_PORTFOLIO = "RenamePortfolio";

export const Modal: FC<RenamePortfolioProps> = props => (
	<Suspense>
		<RenamePortfolio
			id={MODAL_RENAME_PORTFOLIO}
			{...props}
		/>
	</Suspense>
);
 */
