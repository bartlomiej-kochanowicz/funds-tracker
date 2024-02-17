import { TopbarSidebar } from "components/layouts/TopbarSidebar";
import { ProtectedRoute } from "components/ProtectedRoute";
import { ROUTES } from "routes/paths";

import { Settings } from "./Settings";

export const SettingsRoutes = [
	{
		path: ROUTES.SETTINGS,
		element: (
			<ProtectedRoute>
				<TopbarSidebar>
					<Settings />
				</TopbarSidebar>
			</ProtectedRoute>
		),
	},
];
