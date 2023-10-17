import { lazy } from "react";
import { ROUTES } from "routes/paths";

const UnprotectedRoute = lazy(() =>
	import("utils/UnprotectedRoute").then(({ UnprotectedRoute: component }) => ({
		default: component,
	})),
);

const Home = lazy(() => import("./Home").then(({ Home: component }) => ({ default: component })));

export const HomeRoutes = [
	{
		path: ROUTES.HOME,
		element: (
			<UnprotectedRoute to={ROUTES.DASHBOARD}>
				<Home />
			</UnprotectedRoute>
		),
	},
];
