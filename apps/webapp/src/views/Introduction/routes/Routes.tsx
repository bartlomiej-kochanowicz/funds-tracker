import { lazy } from "react";
import { ROUTES } from "routes/paths";

const ProtectedRoute = lazy(() =>
	import("utils/ProtectedRoute").then(({ ProtectedRoute: component }) => ({ default: component })),
);

const Introduction = lazy(() =>
	import("./Introduction").then(({ Introduction: component }) => ({
		default: component,
	})),
);

export const IntroductionRoutes = [
	{
		path: ROUTES.INTRODUCTION,
		element: (
			<ProtectedRoute>
				<Introduction />
			</ProtectedRoute>
		),
	},
];
