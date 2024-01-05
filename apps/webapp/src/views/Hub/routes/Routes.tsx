import { TopbarSidebar } from "components/layouts/TopbarSidebar";
import { ProtectedRoute } from "components/ProtectedRoute";
import { lazy } from "react";
import { ROUTES } from "routes/paths";

const Hub = lazy(() =>
	import("./Hub").then(({ Hub: component }) => ({
		default: component,
	})),
);

export const HubRoutes = [
	{
		path: ROUTES.HUB,
		element: (
			<ProtectedRoute>
				<TopbarSidebar>
					<Hub />
				</TopbarSidebar>
			</ProtectedRoute>
		),
	},
];
