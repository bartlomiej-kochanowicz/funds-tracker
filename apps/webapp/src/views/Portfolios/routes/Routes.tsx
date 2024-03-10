import { TopbarSidebar } from "components/layouts/TopbarSidebar";
import { ProtectedRoute } from "components/ProtectedRoute";
import { ROUTES } from "routes/paths";

import { Portfolio } from "./Portfolio";
import { Portfolios } from "./Portfolios/Portfolios";

export const PortfoliosRoutes = [
	{
		path: ROUTES.PORTFOLIOS.PORTFOLIOS,
		element: (
			<ProtectedRoute>
				<TopbarSidebar>
					<Portfolios />
				</TopbarSidebar>
			</ProtectedRoute>
		),
	},
	{
		path: ROUTES.PORTFOLIOS.PORTFOLIO,
		element: (
			<ProtectedRoute>
				<TopbarSidebar>
					<Portfolio />
				</TopbarSidebar>
			</ProtectedRoute>
		),
	},
];
