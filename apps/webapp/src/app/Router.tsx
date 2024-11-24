import { paths } from "config/paths";
import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router";

import { Login } from "./routes/login";
import { Register } from "./routes/register";

const Homepage = lazy(() =>
	import("./routes/homepage").then(({ Homepage: component }) => ({ default: component })),
);
const NotFound = lazy(() =>
	import("./routes/not-found").then(({ NotFound: component }) => ({ default: component })),
);

const Router = () => {
	const location = useLocation();
	const background = location.state && location.state.background;

	return (
		<>
			<Routes location={background || location}>
				<Route
					path={paths.homepage}
					element={<Homepage />}
				/>
				<Route
					path="*"
					element={<NotFound />}
				/>
			</Routes>
			{/* Render modals here */}
			{background && (
				<Routes>
					<Route
						path={paths.login}
						element={<Login />}
					/>
					<Route
						path={paths.register.register}
						element={<Register />}
					/>
				</Routes>
			)}
		</>
	);
};

export { Router };
