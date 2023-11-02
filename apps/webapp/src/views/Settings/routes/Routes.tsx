import { ErrorContent } from "components/molecules";
import { ProtectedRoute } from "components/ProtectedRoute";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";
import { ROUTES } from "routes/paths";

import { MyProfile } from "./MyProfile";

export const SettingsRoutes = [
	{
		path: ROUTES.SETTINGS.SETTINGS,
		element: (
			<ProtectedRoute>
				<ErrorBoundary FallbackComponent={ErrorContent}>
					<Outlet />
				</ErrorBoundary>
			</ProtectedRoute>
		),
		children: [{ path: ROUTES.SETTINGS.MY_PROFILE, element: <MyProfile /> }],
	},
];
