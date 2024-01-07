/* import { ProtectedRoute } from "components/ProtectedRoute";
import { lazy } from "react";
import { ROUTES } from "routes/paths";

const Portfolios = lazy(() =>
	import("./Portfolios").then(({ Portfolios: component }) => ({
		default: component,
	})),
);

const Portfolio = lazy(() =>
	import("./Portfolio").then(({ Portfolio: component }) => ({
		default: component,
	})),
);

export const PortfoliosRoutes = [
	{
		path: ROUTES.PORTFOLIOS.PORTFOLIOS,
		element: (
			<ProtectedRoute>
				<Portfolios />
			</ProtectedRoute>
		),
	},
	{
		path: ROUTES.PORTFOLIOS.PORTFOLIO,
		element: (
			<ProtectedRoute>
				<Portfolio />
			</ProtectedRoute>
		),
	},
];
 */
