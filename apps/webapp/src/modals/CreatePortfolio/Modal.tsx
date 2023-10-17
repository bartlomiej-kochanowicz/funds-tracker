import { FC, lazy, Suspense } from "react";

import type { CreatePortfolioProps } from "./CreatePortfolio";

const CreatePortfolio = lazy(() =>
	import("./CreatePortfolio").then(({ CreatePortfolio: component }) => ({
		default: component,
	})),
);

export const MODAL_CREATE_PORTFOLIO = "CreatePortfolio";

export const Modal: FC<CreatePortfolioProps> = props => (
	<Suspense>
		<CreatePortfolio id={MODAL_CREATE_PORTFOLIO} {...props} />
	</Suspense>
);
