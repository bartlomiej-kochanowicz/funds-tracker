import { lazy } from "react";
import { ROUTES } from "routes/paths";

const Home = lazy(() => import("./Home").then(({ Home: component }) => ({ default: component })));

export const HomeRoutes = [
	{
		path: ROUTES.HOME,
		element: <Home />,
	},
];
