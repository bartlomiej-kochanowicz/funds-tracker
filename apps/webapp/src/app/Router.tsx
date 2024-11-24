import { paths } from "config/paths";
import { lazy } from "react";
import { Route, Routes } from "react-router";

const Homepage = lazy(() =>
	import("./routes/homepage").then(({ Homepage: component }) => ({ default: component })),
);

const Router = () => (
	<Routes>
		<Route
			path={paths.homepage}
			element={<Homepage />}
		/>
	</Routes>
);

export { Router };
