import { lazy } from "react";
import { ROUTES } from "routes/paths";

const NotFound = lazy(() =>
	import("./NotFound").then(({ NotFound: component }) => ({ default: component })),
);

export const NotFoundRoutes = [
	{
		path: ROUTES.ANY,
		element: <NotFound />,
	},
];
