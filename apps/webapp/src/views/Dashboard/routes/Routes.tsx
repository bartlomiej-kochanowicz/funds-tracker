import { TopbarSidebar } from "components/layouts/TopbarSidebar";
import { ProtectedRoute } from "components/ProtectedRoute";
import { lazy } from "react";
import { ROUTES } from "routes/paths";

const Dashboard = lazy(() =>
	import("./Dashboard").then(({ Dashboard: component }) => ({
		default: component,
	})),
);

export const DashboardRoutes = [
	{
		path: ROUTES.DASHBOARD,
		element: (
			<ProtectedRoute>
				<TopbarSidebar>
					<Dashboard />
				</TopbarSidebar>
			</ProtectedRoute>
		),
	},
];
